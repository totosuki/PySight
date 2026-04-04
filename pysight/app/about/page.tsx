import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | PySight",
  description: "このページでは、PySight の目的や制作者の簡単な自己紹介を掲載しています。",
  openGraph: {
    siteName: "PySight",
    title: "About | PySight",
    url: "https://pysight.dev/about/",
    description: "このページでは、PySight の目的や制作者の簡単な自己紹介を掲載しています。",
    type: "website",
    images: [{ url: "https://pysight.dev/assets/pysight-summary.png" }],
  },
  twitter: {
    card: "summary",
    title: "About | PySight",
    description: "このページでは、PySight の目的や制作者の簡単な自己紹介を掲載しています。",
    images: ["https://pysight.dev/assets/pysight-summary.png"],
  },
  alternates: {
    canonical: "https://pysight.dev/about/",
  },
};

function About() {
  return (
    <main className="max-w-[760px] mx-auto px-6 py-10 prose">
      <h1>作者について</h1>
      <p>こんにちは、totosuki です。</p>
      <p>音楽とプログラミングとPythonが好きです。</p>
      <p>
        <span className="font-heading">PySight</span>{" "}
        は、私の個人ホームページ兼、Python に関する知見をまとめたサイトです。
      </p>
      <p>
        GitHub（
        <a href="https://github.com/totosuki" target="_blank" rel="noopener noreferrer">
          @totosuki
        </a>
        ）X（
        <a href="https://x.com/totosuki_" target="_blank" rel="noopener noreferrer">
          @totosuki_
        </a>
        ）でも活動しています。感想などあれば気軽にどうぞ！
      </p>

      <h1><span className="font-heading">PySight</span> について</h1>
      <p>
        <span className="font-heading">PySight</span>{" "}
        では、公式ドキュメントだけでは掴みにくい Python の仕様や内部の仕組みについて、調査・実験した結果を記事としてまとめています。
      </p>
      <p>ちょっとマニアックだけど、読み物としても楽しめる内容を目指しています。</p>

      <h1>注意点</h1>
      <p>
        記事を掲載するにあたり、情報の精査をしてはいますが完璧ではありません。あくまでも参考程度にご覧ください。
      </p>
      <p>
        なお、記事の内容は気づいた点や検証結果の変化に応じて、予告なく修正・更新されることがあります。
      </p>
    </main>
  );
}

export default About;
