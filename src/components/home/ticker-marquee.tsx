'use client'

import Link from 'next/link'
import { Radio } from 'lucide-react'

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'

export type TickerItem = { title: string; slug: string }

export function TickerMarquee({ items }: { items: TickerItem[] }) {
  // Duplicate items so the scroll looks seamless
  const doubled = [...items, ...items]

  return (
    <div
      className="flex items-stretch overflow-hidden border-b"
      style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}18` }}
    >
      {/* "LIVE" badge — always visible on the left */}
      <div
        className="flex shrink-0 items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
        style={{ background: ACCENT_DARK }}
      >
        <Radio className="h-3.5 w-3.5 animate-pulse" />
        Live
      </div>

      {/* Scrolling track */}
      <div className="relative flex min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track flex items-center gap-0 whitespace-nowrap py-2">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <Link
                href={`/updates/${item.slug}`}
                className="px-5 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:underline"
                style={{ color: ACCENT_DARK }}
              >
                {item.title}
              </Link>
              {/* Separator dot */}
              <span
                className="text-[11px] font-bold opacity-40 select-none"
                style={{ color: ACCENT_DARK }}
                aria-hidden
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
