import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return {
    title: `${article.title} | PySight`,
    description: article.description,
    openGraph: {
      siteName: "PySight",
      title: `${article.title} | PySight`,
      url: `https://pysight.dev/articles/${slug}/`,
      description: article.description,
      type: "article",
      images: [{ url: "https://pysight.dev/assets/pysight-summary.png" }],
    },
    twitter: {
      card: "summary",
      title: `${article.title} | PySight`,
      description: article.description,
      images: ["https://pysight.dev/assets/pysight-summary.png"],
    },
    alternates: {
      canonical: `https://pysight.dev/articles/${slug}/`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <main className="max-w-[760px] mx-auto px-6 py-10">
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </main>
  );
}
