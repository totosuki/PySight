import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

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

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: { dark: 'github-dark-dimmed', light: 'github-light' },
      defaultColor: false,
    })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    contentHtml,
  };
}
