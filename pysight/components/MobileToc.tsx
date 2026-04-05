'use client';

import { useState, useEffect } from 'react';
import { MdOutlineToc, MdClose } from 'react-icons/md';
import type { TocEntry } from '@/lib/articles';
import Toc from './Toc';

export default function MobileToc({ toc }: { toc: TocEntry[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (toc.length === 0) return null;

  return (
    <>
      {/* Accordion（記事上部） */}
      <details className="mb-8 border border-(--border) rounded-lg overflow-hidden mobile-toc-details">
        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-bold select-none">
          目次
          <span className="mobile-toc-chevron text-(--quote-author) text-xs transition-transform duration-200">▼</span>
        </summary>
        <div className="px-2 pb-3">
          <Toc toc={toc} />
        </div>
      </details>

      {/* フローティングボタン（スクロール後に表示） */}
      <button
        onClick={() => setDrawerOpen(true)}
        className={`
          fixed bottom-6 right-5 z-40 flex items-center gap-1.5
          bg-(--fg) text-(--bg) text-sm font-bold
          px-3 py-2 rounded-full shadow-lg
          transition-all duration-200
          ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        aria-label="目次を開く"
      >
        <MdOutlineToc size={18} />
        目次
      </button>

      {/* ドロワー */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* オーバーレイ */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          {/* パネル */}
          <div className="relative bg-(--bg) rounded-t-2xl border-t border-(--border) max-h-[70vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-(--border) flex-shrink-0">
              <span className="font-bold text-sm">目次</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-(--quote-author) hover:text-(--fg) transition-colors"
                aria-label="閉じる"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="overflow-y-auto px-2 py-3">
              <Toc toc={toc} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
