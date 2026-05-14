import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'

export const revalidate = 300

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

function excerpt(text?: string | null, max = 160) {
  const value = (text || '').trim()
  if (!value) return 'Read the full press release for details and outreach context.'
  return value.length > max ? value.slice(0, max - 3).trimEnd() + '...' : value
}

function getCategory(post: { content?: unknown; tags?: string[] }): string {
  const content = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  if (typeof content.category === 'string' && content.category.trim()) return content.category.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  return typeof tag === 'string' ? tag : 'Press Release'
}

export default async function PressPage() {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })

  return (
    <div className="min-h-screen text-neutral-900" style={{ background: '#fdf5f7' }}>
      <NavbarShell />

      {/* Page header */}
      <header
        className="px-4 py-12 sm:px-6"
        style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)` }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 h-1 w-12 rounded-full" style={{ background: ACCENT }} />
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Press Releases
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85">
            Latest announcements, coverage, and syndicated updates from our newsroom.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const category = getCategory(post)
              return (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor: `${ACCENT}66` }}
                >
                  {/* Category pill */}
                  <span
                    className="inline-block w-fit rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ background: ACCENT, color: ACCENT_DARK }}
                  >
                    {category}
                  </span>

                  {/* Title */}
                  <h2
                    className="mt-3 text-base font-bold leading-snug tracking-tight transition group-hover:underline"
                    style={{ color: ACCENT_DARK }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 flex-1 text-sm leading-[1.75] text-neutral-600">
                    {excerpt(post.summary)}
                  </p>

                  {/* Footer row */}
                  <div className="mt-5 flex items-center justify-between gap-2">
                    <span
                      className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] transition group-hover:underline"
                      style={{ color: ACCENT_MID }}
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center text-neutral-500">
            <Newspaper className="h-10 w-10 opacity-25" />
            <p className="text-sm">No press releases yet. Check back soon.</p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              style={{ background: ACCENT_DARK }}
            >
              Submit a press release
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
