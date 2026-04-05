import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import type { Root, Heading, PhrasingContent } from 'mdast';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export type TocEntry = {
  id: string;
  text: string;
  depth: 1 | 2 | 3 | 4;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
  toc: TocEntry[];
};

/** 見出しノードからテキストを再帰的に抽出する */
function extractHeadingText(children: PhrasingContent[]): string {
  return children
    .map((child) => {
      if (child.type === 'text' || child.type === 'inlineCode') return child.value;
      if ('children' in child) return extractHeadingText(child.children as PhrasingContent[]);
      return '';
    })
    .join('');
}

/** Markdownコンテンツから見出し一覧を抽出する */
export function extractToc(content: string): TocEntry[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content) as Root;
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];

  visit(tree, 'heading', (node: Heading) => {
    if (node.depth > 4) return;
    const text = extractHeadingText(node.children as PhrasingContent[]);
    const id = slugger.slug(text);
    toc.push({ id, text, depth: node.depth as 1 | 2 | 3 | 4 });
  });

  return toc;
}

/** すべての記事のスラッグ一覧を返す（静的生成用） */
export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

/** すべての記事のメタ情報をdate降順で返す */
export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs();

  const articles = slugs.map((slug) => {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
    };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** スラッグから記事1件を取得し、MarkdownをHTMLに変換して返す */
export async function getArticleBySlug(slug: string): Promise<Article> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const toc = extractToc(content);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    contentHtml,
    toc,
  };
}
