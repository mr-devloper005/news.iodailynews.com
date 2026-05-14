import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

type DistributionPageFrameProps = {
  title: string
  description?: string
  /** e.g. search form in the hero row */
  actions?: ReactNode
  children: ReactNode
}

export function DistributionPageFrame({ title, description, actions, children }: DistributionPageFrameProps) {
  return (
    <div className="min-h-screen text-neutral-900" style={{ background: '#fdf5f7' }}>
      <NavbarShell />

      {/* Page header — matches contact/home gradient */}
      <header
        className="px-4 py-10 sm:px-6"
        style={{
          background: `linear-gradient(135deg, ${ACCENT_DARK} 0%, ${ACCENT_MID} 100%)`,
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {/* Accent bar above title */}
            <div
              className="mb-4 h-1 w-12 rounded-full"
              style={{ background: ACCENT }}
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {children}
      </div>

      <Footer />
    </div>
  )
}
