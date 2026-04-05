import type { Metadata } from "next";
import ArticleList from "@/components/ArticleList";

export const metadata: Metadata = {
  title: "Articles | PySight",
  description: "PySight の記事一覧ページ。",
  openGraph: {
    siteName: "PySight",
    title: "記事一覧 | PySight",
    url: "https://pysight.dev/articles/",
    description: "PySight の記事一覧ページ。",
    type: "website",
    images: [{ url: "https://pysight.dev/assets/pysight-summary.png" }],
  },
  twitter: {
    card: "summary",
    title: "記事一覧 | PySight",
    description: "PySight の記事一覧ページ。",
    images: ["https://pysight.dev/assets/pysight-summary.png"],
  },
  alternates: {
    canonical: "https://pysight.dev/articles/",
  },
};

function Articles() {
  return (
    <main className="max-w-[760px] mx-auto px-6 py-10">
      <h1 className="text-[1.6rem] font-bold mb-2">記事一覧</h1>
      <p className="text-sm mb-6 text-(--quote-content)">辞書順で表示しています。</p>
      <ArticleList />
    </main>
  );
}

export default Articles;
