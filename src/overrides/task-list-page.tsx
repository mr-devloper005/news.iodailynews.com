import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { DistributionSidebar } from '@/components/distribution/distribution-sidebar'

const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full post for distribution notes and the complete story.'
  return value.length > 220 ? value.slice(0, 217).trimEnd() + '...' : value
}

export async function TaskListPageOverride(_: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })
  const recent = posts.slice(0, 6).map((p) => ({ slug: p.slug, title: p.title }))

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <NavbarShell />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <div className="min-w-0 space-y-12">
          <header className="border-b border-neutral-200 pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">Guest posts & syndication</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Press-ready stories, outreach updates, and syndicated placements for teams that care about clean distribution
              more than noisy feeds.
            </p>
          </header>

          {posts.map((post) => (
            <article key={post.id} className="border-b border-neutral-200 pb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {String((post.content as { category?: string })?.category || 'Distribution update')}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-neutral-950 sm:text-3xl">{post.title}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                <span>By {post.authorName || 'Editorial desk'}</span>
              </div>
              <p className="mt-6 max-w-3xl text-base leading-[1.75] text-neutral-700">{excerpt(post.summary)}</p>
              <div className="mt-6">
                <Link
                  href={`/updates/${post.slug}`}
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
                  style={{ background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)` }}
                >
                  Read full post
                </Link>
              </div>
            </article>
          ))}
        </div>

        <DistributionSidebar recentPosts={recent} className="lg:pt-2" />
      </main>
      <Footer />
    </div>
  )
}
