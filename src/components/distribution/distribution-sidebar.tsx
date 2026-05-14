import Link from 'next/link'

export type DistributionSidebarPost = { slug: string; title: string }

export const DISTRIBUTION_CATEGORY_LINKS = [
  { label: 'Press releases', href: '/press' },
  { label: 'Guest posts & syndication', href: '/updates' },
  { label: 'Distribution channels', href: '/updates' },
  { label: 'Editorial guidelines', href: '/terms' },
  { label: 'Privacy & disclosures', href: '/privacy' },
  { label: 'Help & support', href: '/help' },
] as const

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

export function DistributionSidebar({
  recentPosts,
  className = '',
}: {
  recentPosts: DistributionSidebarPost[]
  className?: string
}) {
  return (
    <aside className={`space-y-8 ${className}`}>
      {/* Search */}
      <div>
        <p
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: ACCENT_DARK }}
        >
          Search
        </p>
        <form
          action="/search"
          method="get"
          className="mt-3 flex overflow-hidden rounded-xl border shadow-sm"
          style={{ borderColor: `${ACCENT}88` }}
        >
          <input type="hidden" name="master" value="1" />
          <label htmlFor="site-search" className="sr-only">
            Search posts
          </label>
          <input
            id="site-search"
            name="q"
            className="h-11 min-w-0 flex-1 border-0 bg-white px-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
            placeholder="Search titles and topics"
            autoComplete="off"
          />
          <button
            type="submit"
            className="shrink-0 px-4 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
            style={{ background: ACCENT_DARK }}
          >
            Go
          </button>
        </form>
      </div>

      {/* Recent posts */}
      <div>
        <h2
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: ACCENT_DARK }}
        >
          Recent posts
        </h2>
        <ul
          className="mt-4 divide-y overflow-hidden rounded-xl border"
          style={{ borderColor: `${ACCENT}66` }}
        >
          {recentPosts.length ? (
            recentPosts.map((post) => (
              <li key={post.slug} style={{ borderColor: `${ACCENT}44` }}>
                <Link
                  href={`/updates/${post.slug}`}
                  className="sidebar-recent-link block px-4 py-3 text-sm leading-snug text-neutral-800 transition"
                >
                  {post.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="bg-white px-4 py-3 text-sm text-neutral-500">No posts yet.</li>
          )}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h2
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: ACCENT_DARK }}
        >
          Categories
        </h2>
        <ul
          className="mt-4 divide-y overflow-hidden rounded-xl border"
          style={{ borderColor: `${ACCENT}66` }}
        >
          {DISTRIBUTION_CATEGORY_LINKS.map((item) => (
            <li key={item.href + item.label} style={{ borderColor: `${ACCENT}44` }}>
              <Link
                href={item.href}
                className="sidebar-category-link block px-4 py-2.5 text-sm text-neutral-800 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit CTA */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)` }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">
          Get published
        </p>
        <p className="mt-2 text-base font-bold leading-snug">
          Submit your press release today
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition hover:opacity-90"
          style={{ background: ACCENT, color: ACCENT_DARK }}
        >
          Submit now →
        </Link>
      </div>
    </aside>
  )
}
