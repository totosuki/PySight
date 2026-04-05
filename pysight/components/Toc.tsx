import type { TocEntry } from '@/lib/articles';

export default function Toc({ toc }: { toc: TocEntry[] }) {
  if (toc.length === 0) return null;

  return (
    <nav aria-label="目次">
      <p className="text-xs font-bold uppercase tracking-wider text-(--quote-author) mb-1 px-3">
        目次
      </p>
      <ul className="list-none p-0 m-0">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={`toc-link toc-depth-${entry.depth}`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
