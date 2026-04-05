import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';

vi.mock('fs');

const mockedFs = vi.mocked(fs);

const FRONTMATTER_A = `---
title: "記事A"
description: "記事Aの説明"
date: "2024-06-01"
---

# 見出し

本文テキスト。
`;

const FRONTMATTER_B = `---
title: "記事B"
description: "記事Bの説明"
date: "2023-12-01"
---

本文テキスト。
`;

const FRONTMATTER_C = `---
title: "記事C"
description: "記事Cの説明"
date: "2025-01-15"
---

**太字** と \`コード\` のテスト。
`;

describe('getArticleSlugs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('.mdファイルのスラッグ一覧を返す', async () => {
    mockedFs.readdirSync.mockReturnValue(
      ['article-a.md', 'article-b.md', 'readme.txt'] as unknown as fs.Dirent[]
    );

    const { getArticleSlugs } = await import('../articles');
    const slugs = getArticleSlugs();

    expect(slugs).toEqual(['article-a', 'article-b']);
  });

  it('.md以外のファイルを除外する', async () => {
    mockedFs.readdirSync.mockReturnValue(
      ['article.md', 'image.png', '.DS_Store', 'draft.md'] as unknown as fs.Dirent[]
    );

    const { getArticleSlugs } = await import('../articles');
    const slugs = getArticleSlugs();

    expect(slugs).toEqual(['article', 'draft']);
  });

  it('ファイルが存在しない場合は空配列を返す', async () => {
    mockedFs.readdirSync.mockReturnValue([] as unknown as fs.Dirent[]);

    const { getArticleSlugs } = await import('../articles');
    const slugs = getArticleSlugs();

    expect(slugs).toEqual([]);
  });
});

describe('getAllArticles', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('フロントマターのメタ情報を返す', async () => {
    mockedFs.readdirSync.mockReturnValue(
      ['article-a.md'] as unknown as fs.Dirent[]
    );
    mockedFs.readFileSync.mockReturnValue(FRONTMATTER_A);

    const { getAllArticles } = await import('../articles');
    const articles = getAllArticles();

    expect(articles).toHaveLength(1);
    expect(articles[0]).toMatchObject({
      slug: 'article-a',
      title: '記事A',
      description: '記事Aの説明',
      date: '2024-06-01',
    });
  });

  it('date降順にソートされる', async () => {
    mockedFs.readdirSync.mockReturnValue(
      ['article-a.md', 'article-b.md', 'article-c.md'] as unknown as fs.Dirent[]
    );
    mockedFs.readFileSync
      .mockReturnValueOnce(FRONTMATTER_A)
      .mockReturnValueOnce(FRONTMATTER_B)
      .mockReturnValueOnce(FRONTMATTER_C);

    const { getAllArticles } = await import('../articles');
    const articles = getAllArticles();

    expect(articles.map((a) => a.date)).toEqual([
      '2025-01-15',
      '2024-06-01',
      '2023-12-01',
    ]);
  });
});

describe('getArticleBySlug', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('フロントマターとHTMLに変換されたコンテンツを返す', async () => {
    mockedFs.readFileSync.mockReturnValue(FRONTMATTER_A);

    const { getArticleBySlug } = await import('../articles');
    const article = await getArticleBySlug('article-a');

    expect(article).toMatchObject({
      slug: 'article-a',
      title: '記事A',
      description: '記事Aの説明',
      date: '2024-06-01',
    });
    expect(article.contentHtml).toContain('<h1');
    expect(article.contentHtml).toContain('本文テキスト');
  });

  it('Markdownの太字とインラインコードがHTMLに変換される', async () => {
    mockedFs.readFileSync.mockReturnValue(FRONTMATTER_C);

    const { getArticleBySlug } = await import('../articles');
    const article = await getArticleBySlug('article-c');

    expect(article.contentHtml).toContain('<strong>');
    expect(article.contentHtml).toContain('<code>');
  });

  it('contentHtmlはstring型である', async () => {
    mockedFs.readFileSync.mockReturnValue(FRONTMATTER_B);

    const { getArticleBySlug } = await import('../articles');
    const article = await getArticleBySlug('article-b');

    expect(typeof article.contentHtml).toBe('string');
  });

  it('tocが含まれる', async () => {
    mockedFs.readFileSync.mockReturnValue(FRONTMATTER_A);

    const { getArticleBySlug } = await import('../articles');
    const article = await getArticleBySlug('article-a');

    expect(Array.isArray(article.toc)).toBe(true);
  });
});

describe('extractToc', () => {
  it('h1見出しを抽出する', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('# はじめに\n\n本文。\n');

    expect(toc).toHaveLength(1);
    expect(toc[0]).toMatchObject({ text: 'はじめに', depth: 1 });
  });

  it('複数の見出しを順序通りに抽出する', async () => {
    const { extractToc } = await import('../articles');
    const content = '# 概要\n\n## 詳細\n\n### 補足\n\n## まとめ\n';
    const toc = extractToc(content);

    expect(toc).toHaveLength(4);
    expect(toc.map((e) => e.depth)).toEqual([1, 2, 3, 2]);
    expect(toc.map((e) => e.text)).toEqual(['概要', '詳細', '補足', 'まとめ']);
  });

  it('各エントリにid文字列が付与される', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('# Hello World\n');

    expect(typeof toc[0].id).toBe('string');
    expect(toc[0].id.length).toBeGreaterThan(0);
  });

  it('重複した見出しテキストのIDが重複しない', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('# 概要\n\n## 概要\n');

    expect(toc[0].id).not.toBe(toc[1].id);
  });

  it('インラインコードを含む見出しのテキストを正しく抽出する', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('# `__doc__` について\n');

    expect(toc[0].text).toBe('__doc__ について');
  });

  it('太字を含む見出しのテキストを正しく抽出する', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('# **重要**なポイント\n');

    expect(toc[0].text).toBe('重要なポイント');
  });

  it('コードブロック内のシャープ記号を見出しとして誤認識しない', async () => {
    const { extractToc } = await import('../articles');
    const content = '# 本物の見出し\n\n```python\n# コメント\n```\n';
    const toc = extractToc(content);

    expect(toc).toHaveLength(1);
    expect(toc[0].text).toBe('本物の見出し');
  });

  it('見出しがない場合は空配列を返す', async () => {
    const { extractToc } = await import('../articles');
    const toc = extractToc('見出しのない本文テキスト。\n');

    expect(toc).toEqual([]);
  });

  it('h5以上の見出しは含めない', async () => {
    const { extractToc } = await import('../articles');
    const content = '# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n';
    const toc = extractToc(content);

    expect(toc.every((e) => e.depth <= 4)).toBe(true);
    expect(toc).toHaveLength(4);
  });
});
