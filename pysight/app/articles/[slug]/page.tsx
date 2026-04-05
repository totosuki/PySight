import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import Toc from "@/components/Toc";
import MobileToc from "@/components/MobileToc";

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
    <div className="max-w-[1100px] mx-auto px-6 py-10 lg:flex lg:gap-12">
      {/* デスクトップ sidebar TOC */}
      <aside className="hidden lg:block w-[220px] flex-shrink-0">
        <div className="sticky top-[95px] max-h-[calc(100vh-115px)] overflow-y-auto">
          <Toc toc={article.toc} />
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* モバイル向けTOC（accordion + フローティングボタン） */}
        <div className="lg:hidden">
          <MobileToc toc={article.toc} />
        </div>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </main>
    </div>
  );
}
