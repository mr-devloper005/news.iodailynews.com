'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, Facebook, Instagram, Linkedin, Youtube, Radio } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

const utilityLinks = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Guest post guidelines', href: '/terms' },
  { label: 'Submit a guest post', href: '/contact' },
]

const mainNav = [
  { label: 'Press releases', href: '/press' },
  { label: 'Guest posts', href: '/updates' },
  { label: 'Distribution', href: '/updates' },
  { label: 'Guidelines', href: '/terms' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Search', href: '/search' },
]

const social = [
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
]

export function NavbarOverride() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top utility bar */}
      <div style={{ background: ACCENT_DARK }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-4 py-2 sm:px-6">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {utilityLinks.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {social.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/70 transition hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brand bar */}
      <div
        className="border-b"
        style={{
          background: `linear-gradient(90deg, #fff 0%, #fff5f7 100%)`,
          borderColor: `${ACCENT}66`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl font-extrabold text-white text-lg shadow"
              style={{ background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)` }}
            >
              N
            </div>
            <div>
              <span
                className="block text-xl font-extrabold uppercase tracking-[0.12em] leading-none"
                style={{ color: ACCENT_DARK }}
              >
                {SITE_CONFIG.name}
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-500 mt-0.5">
                Independent media updates
              </span>
            </div>
          </Link>

          {/* Search bar (desktop) */}
          <form
            action="/search"
            method="get"
            className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border px-4 py-2 shadow-sm md:flex"
            style={{ borderColor: `${ACCENT}88`, background: '#fff' }}
          >
            <input type="hidden" name="master" value="1" />
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              name="q"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
              placeholder="Search press releases…"
              autoComplete="off"
            />
          </form>

          {/* Submit CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow transition hover:opacity-90 sm:inline-flex"
              style={{ background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)` }}
            >
              <Radio className="h-3.5 w-3.5" />
              Submit release
            </Link>
            <button
              className="rounded-full p-2 transition hover:bg-neutral-100 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" style={{ color: ACCENT_DARK }} />
              ) : (
                <Menu className="h-5 w-5" style={{ color: ACCENT_DARK }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <nav
        style={{
          background: `linear-gradient(90deg, ${ACCENT_DARK} 0%, #1e3a5f 100%)`,
        }}
      >
        <div className="mx-auto hidden max-w-6xl items-center justify-center gap-0 px-2 sm:px-4 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/85 transition hover:bg-white/10 hover:text-white sm:px-5 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Accent line */}
        <div className="h-[3px] w-full" style={{ background: ACCENT }} />
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-b lg:hidden"
          style={{ background: '#fff5f7', borderColor: `${ACCENT}55` }}
        >
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {/* Mobile search */}
            <form
              action="/search"
              method="get"
              className="mb-3 flex items-center gap-2 rounded-full border px-4 py-2"
              style={{ borderColor: `${ACCENT}88`, background: '#fff' }}
            >
              <input type="hidden" name="master" value="1" />
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              <input
                name="q"
                className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                placeholder="Search press releases…"
                autoComplete="off"
              />
            </form>
            {mainNav.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-white"
                style={{ color: ACCENT_DARK }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
