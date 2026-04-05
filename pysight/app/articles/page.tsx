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
      <h1 className="text-[2rem] font-bold leading-[1.33] mb-[1rem] pb-[0.4rem] border-b border-(--border)">記事一覧</h1>
      <p className="mb-[1.8em]">辞書順で表示しています。</p>
      <ArticleList />
    </main>
  );
}

export default Articles;
