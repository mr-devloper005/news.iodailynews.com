import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { DISTRIBUTION_CATEGORY_LINKS } from '@/components/distribution/distribution-sidebar'
import { ArrowRight, Radio } from 'lucide-react'

export const FOOTER_OVERRIDE_ENABLED = true

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

const LATEST_LINKS = [
  { label: 'All guest posts & updates', href: '/updates' },
  { label: 'Submit for distribution', href: '/contact' },
  { label: 'Search the archive', href: '/search' },
] as const

export function FooterOverride() {
  return (
    <footer className="mt-auto text-white" style={{ background: `linear-gradient(180deg, ${ACCENT_DARK} 0%, #0f2347 100%)` }}>
      {/* Top accent line */}
      <div className="h-[3px] w-full" style={{ background: ACCENT }} />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Brand + tagline */}
        <div className="mb-10 flex flex-col items-start gap-4 border-b pb-10 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'rgba(170,196,245,0.18)' }}>
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl font-extrabold text-white text-base shadow"
                style={{ background: `linear-gradient(135deg, ${ACCENT_MID} 0%, ${ACCENT_DARK} 100%)`, border: `1.5px solid ${ACCENT}44` }}
              >
                N
              </div>
              <span className="text-xl font-extrabold uppercase tracking-[0.14em] text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: `${ACCENT}cc` }}>
              Media distribution, guest publishing, and syndicated outreach for brands and editorial teams.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition hover:opacity-90"
            style={{ background: ACCENT, color: ACCENT_DARK }}
          >
            <Radio className="h-4 w-4" />
            Submit a release
          </Link>
        </div>

        {/* Links grid */}
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              <span className="inline-block h-4 w-0.5 rounded-full" style={{ background: ACCENT }} aria-hidden />
              Categories
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm" style={{ color: `${ACCENT}bb` }}>
              {DISTRIBUTION_CATEGORY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              <span className="inline-block h-4 w-0.5 rounded-full" style={{ background: ACCENT }} aria-hidden />
              Latest &amp; outreach
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm" style={{ color: `${ACCENT}bb` }}>
              {LATEST_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              <span className="inline-block h-4 w-0.5 rounded-full" style={{ background: ACCENT }} aria-hidden />
              Search
            </h3>
            <form action="/search" method="get" className="mt-5 flex flex-col gap-2">
              <input type="hidden" name="master" value="1" />
              <input
                name="q"
                className="h-11 rounded-lg border px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/40"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(170,196,245,0.25)' }}
                placeholder="Search the archive"
              />
              <button
                type="submit"
                className="h-11 rounded-lg text-sm font-bold uppercase tracking-wide transition hover:opacity-90"
                style={{ background: ACCENT, color: ACCENT_DARK }}
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 text-xs sm:flex-row"
          style={{ borderColor: 'rgba(170,196,245,0.15)', color: `${ACCENT}88` }}
        >
          <span>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Guest publishing and media distribution.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">Privacy</Link>
            <span className="opacity-40">·</span>
            <Link href="/terms" className="transition hover:text-white">Terms</Link>
            <span className="opacity-40">·</span>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
