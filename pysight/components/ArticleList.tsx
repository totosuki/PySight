'use client';

import { useState } from 'react';

type Article = {
  href: string;
  title: string;
  desc: string;
};

const articles: Article[] = [
  {
    href: '/articles/doc/',
    title: '__doc__について',
    desc: 'Pythonの特殊属性__doc__の基本と使い方を紹介。docstringを利用したカスタマイズ方法や記述スタイルのポイントも紹介します。',
  },
  {
    href: '/articles/mro/',
    title: 'Classの多重継承とMRO',
    desc: 'Pythonの多重継承とMRO(Method Resolution Order)について解説。MROの基本ルールやメソッドの呼び出し順序を調べました。',
  },
  {
    href: '/articles/codegolf-technique/',
    title: 'Code Golfのテクニック5選',
    desc: 'Code Golf の概要を「Hello World」で解説し、変数名短縮・セイウチ演算子・open(0) 入力・"YNeos"スライスなど、Python での Code Golf テクニックを5つ、実例付きで紹介します。',
  },
  {
    href: '/articles/ellipsis/',
    title: 'Ellipsisオブジェクト',
    desc: 'Pythonの組み込み定数Ellipsisオブジェクトについて紹介。リテラル記法やNumPyでの使い方を具体例で紹介します。',
  },
  {
    href: '/articles/frozenset/',
    title: 'frozenset型',
    desc: 'Pythonのfrozenset型を紹介。set型との違いや辞書のキーとしての利用方法を具体例で紹介します。',
  },
  {
    href: '/articles/iterable-iterator/',
    title: 'iterableとiterator',
    desc: 'Pythonのiterableとiteratorの違いを解説。基本的な概念からfor文の仕組み、実装例までをまとめてみました。',
  },
  {
    href: '/articles/re/',
    title: 'reモジュール',
    desc: 'Pythonのreモジュールについて、関数と例外をまとめました。',
  },
  {
    href: '/articles/super/',
    title: 'super()の仕組み',
    desc: 'Pythonのsuper()について、基本的な使い方からMROとの関係、引数の動作原理まで実例付きで解説します。',
  },
  {
    href: '/articles/tuple-literals/',
    title: 'tuple型のリテラル記法',
    desc: 'Pythonのtuple型のリテラルでの記述方法を紹介。',
  },
  {
    href: '/articles/non-existent-key/',
    title: '存在しないキー取得時の対処法3選',
    desc: 'Pythonの辞書で存在しないキーを扱う方法を紹介。try-except文、dict.getメソッド、defaultdictの使い方を具体例と共に紹介します。',
  },
  {
    href: '/articles/constants/',
    title: '組み込み定数',
    desc: 'Pythonの組み込み定数について解説。True, False, None, NotImplemented, Ellipsis, __debug__の特徴を具体例で紹介します。',
  },
];

export default function ArticleList() {
  const [statusText, setStatusText] = useState('');

  return (
    <>
      <div className="flex flex-col gap-3 pb-[28px]">
        {articles.map((article) => (
          <a
            key={article.href}
            href={article.href}
            className="article-card"
            onMouseEnter={() => setStatusText(article.desc)}
            onMouseLeave={() => setStatusText('')}
            onFocus={() => setStatusText(article.desc)}
            onBlur={() => setStatusText('')}
          >
            <h3 className="text-[1rem] font-medium leading-snug m-0">{article.title}</h3>
          </a>
        ))}
      </div>
      <footer className="status-bar" aria-live="polite">{statusText}</footer>
    </>
  );
}
