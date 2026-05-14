import Link from 'next/link'
import { ArrowRight, TrendingUp, Globe, Newspaper, Clock, ChevronRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { DistributionSidebar } from '@/components/distribution/distribution-sidebar'
import { TickerMarquee } from '@/components/home/ticker-marquee'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

function excerpt(text?: string | null, max = 220) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for outreach context and the complete update.'
  return value.length > max ? value.slice(0, max - 3).trimEnd() + '...' : value
}

function CategoryPill({ label }: { label: string }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
      style={{ background: ACCENT, color: ACCENT_DARK }}
    >
      {label}
    </span>
  )
}

function StatBar() {
  const stats = [
    { icon: Newspaper, label: 'Press Releases', value: '2,400+' },
    { icon: Globe, label: 'Distribution Reach', value: '180+ outlets' },
    { icon: TrendingUp, label: 'Monthly Readers', value: '500K+' },
    { icon: Clock, label: 'Avg. Publish Time', value: '< 24 hrs' },
  ]
  return (
    <div
      className="border-b"
      style={{ borderColor: `${ACCENT}44`, background: `linear-gradient(90deg, ${ACCENT_DARK}f5 0%, #1e3a5f 100%)` }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-4 sm:px-6">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: `${ACCENT}28` }}
            >
              <Icon className="h-4 w-4" style={{ color: ACCENT }} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">{label}</p>
              <p className="text-base font-bold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 16, { fresh: true })
  const featured = posts[0]
  const secondaryFeatured = posts.slice(1, 4)
  const rest = posts.slice(4)
  const sidebarRecent = posts.slice(0, 6).map((p) => ({ slug: p.slug, title: p.title }))

  // Build ticker items from real post titles; fall back to static items if no posts yet
  const tickerItems = posts.length > 0
    ? posts.slice(0, 10).map((p) => ({ title: p.title, slug: p.slug }))
    : [
        { title: 'Latest press releases now live', slug: '' },
        { title: 'Submit your guest post today', slug: '' },
        { title: 'Media distribution open for brands', slug: '' },
        { title: 'Editorial guidelines updated', slug: '' },
      ]

  return (
    <div className="min-h-screen text-neutral-900" style={{ background: '#fdf5f7' }}>
      <NavbarShell />

      {/* Live marquee ticker with real post titles */}
      <TickerMarquee items={tickerItems} />

      {/* Stats bar */}
      <StatBar />

      {/* Hero section */}
      <section
        className="border-b"
        style={{
          borderColor: `${ACCENT}44`,
          background: `linear-gradient(160deg, #fde8ee 0%, #fdf5f7 55%, #fff 100%)`,
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-10">
            {/* Featured story */}
            {featured ? (
              <article>
                <div className="mb-4 flex items-center gap-3">
                  <CategoryPill
                    label={
                      String((featured.content as { category?: string })?.category || 'Featured')
                    }
                  />
                </div>
                <h1
                  className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.4rem]"
                  style={{ color: ACCENT_DARK }}
                >
                  {featured.title}
                </h1>
                <p className="mt-5 text-base leading-[1.8] text-neutral-600">
                  {excerpt(featured.summary, 300)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                  <span>By {featured.authorName || 'Editorial desk'}</span>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/updates/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
                    style={{ background: ACCENT_DARK }}
                  >
                    Read full story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/updates"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition hover:bg-white"
                    style={{ borderColor: ACCENT_DARK, color: ACCENT_DARK }}
                  >
                    All releases
                  </Link>
                </div>
              </article>
            ) : (
              <div>
                <h1
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: ACCENT_DARK }}
                >
                  {SITE_CONFIG.name}
                </h1>
                <p className="mt-4 max-w-2xl text-neutral-600">{SITE_CONFIG.description}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white"
                  style={{ background: ACCENT_DARK }}
                >
                  Submit a guest post
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Secondary featured stories */}
            <div className="flex flex-col gap-4">
              {secondaryFeatured.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                  style={{ borderColor: `${ACCENT}55` }}
                >
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div>
                      <CategoryPill
                        label={
                          String((post.content as { category?: string })?.category || 'Update')
                        }
                      />
                      <h2
                        className="mt-2 text-base font-bold leading-snug transition group-hover:underline"
                        style={{ color: ACCENT_DARK }}
                      >
                        {post.title}
                      </h2>
                    </div>
                  </div>
                  <ChevronRight
                    className="mt-1 h-5 w-5 shrink-0 opacity-30 transition group-hover:opacity-80"
                    style={{ color: ACCENT_DARK }}
                  />
                </Link>
              ))}

              {/* CTA card */}
              <div
                className="mt-1 rounded-2xl p-5 text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)`,
                }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">
                  Media distribution
                </p>
                <p className="mt-2 text-lg font-bold leading-snug">
                  Reach 180+ outlets with one submission
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition hover:opacity-90"
                  style={{ background: ACCENT, color: ACCENT_DARK }}
                >
                  Submit now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section divider label */}
      <div
        className="border-b border-t"
        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}14` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: ACCENT_DARK }}
          >
            Latest press releases &amp; updates
          </span>
          <Link
            href="/updates"
            className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:underline"
            style={{ color: ACCENT_MID }}
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Main content + sidebar */}
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        {/* Article list */}
        <div className="space-y-0 divide-y" style={{ borderColor: `${ACCENT}33` }}>
          {rest.map((post, idx) => (
            <article
              key={post.id}
              className="group py-8 first:pt-0"
            >
              <div className="flex flex-wrap items-center gap-3">
                <CategoryPill
                  label={
                    String((post.content as { category?: string })?.category || 'Guest post')
                  }
                />
                {idx === 0 && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{ background: ACCENT_MID }}
                  >
                    New
                  </span>
                )}
              </div>
              <Link href={`/updates/${post.slug}`}>
                <h2
                  className="mt-3 text-xl font-bold leading-snug tracking-tight transition group-hover:underline sm:text-2xl"
                  style={{ color: ACCENT_DARK }}
                >
                  {post.title}
                </h2>
              </Link>
              <p className="mt-3 max-w-3xl text-sm leading-[1.8] text-neutral-600">
                {excerpt(post.summary)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="text-xs text-neutral-500">
                  By {post.authorName || 'Editorial desk'}
                </span>
                <Link
                  href={`/updates/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] transition hover:underline"
                  style={{ color: ACCENT_MID }}
                >
                  Continue reading
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}

          {rest.length === 0 && (
            <div className="py-12 text-center text-neutral-500">
              <Newspaper className="mx-auto mb-3 h-8 w-8 opacity-30" />
              <p className="text-sm">No posts yet. Check back soon.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <DistributionSidebar recentPosts={sidebarRecent} className="lg:pt-2" />
      </main>

      {/* Bottom CTA banner */}
      <section
        className="border-t"
        style={{
          borderColor: `${ACCENT}44`,
          background: `linear-gradient(100deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)`,
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6">
          <span
            className="rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ background: `${ACCENT}28`, color: ACCENT }}
          >
            Get published
          </span>
          <h2 className="max-w-2xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            Distribute your press release to 180+ media outlets in under 24 hours
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/70">
            Reach journalists, editors, and readers across the web. Submit once, get covered everywhere.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold shadow-lg transition hover:opacity-90"
              style={{ background: ACCENT, color: ACCENT_DARK }}
            >
              Submit a press release
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View archive
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
