import type { TocEntry } from '@/lib/articles';

const INDENT: Record<number, string> = { 1: '', 2: 'pl-3', 3: 'pl-6', 4: 'pl-9' };

export default function Toc({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;

  return (
    <nav aria-label="目次">
      <p className="font-bold text-sm mb-3 text-(--fg)">目次</p>
      <ul className="text-sm flex flex-col gap-1">
        {toc.map((entry) => (
          <li key={entry.id} className={INDENT[entry.depth] ?? 'pl-9'}>
            <a
              href={`#${entry.id}`}
              className="text-(--quote-content) hover:text-(--fg) transition-colors duration-150 leading-snug block"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
