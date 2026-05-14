'use client'

import { useState } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const ACCENT = '#FFC69D'
const ACCENT_DARK = '#CD2C58'
const ACCENT_MID = '#E06B80'

const orgTypes = [
  'Please Select',
  'Individual / Freelancer',
  'Small Business',
  'Agency / PR Firm',
  'Enterprise / Corporation',
  'Non-profit / NGO',
  'Media / Publishing',
  'Other',
]

const subjects = [
  'Please Select',
  'Submit a press release',
  'Guest post inquiry',
  'Distribution partnership',
  'Editorial question',
  'Technical support',
  'General inquiry',
]

export function ContactPageOverride() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    orgType: 'Please Select',
    subject: 'Please Select',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen text-neutral-900" style={{ background: '#fdf5f7' }}>
      <NavbarShell />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Page title */}
        <h1
          className="mb-10 text-center text-4xl font-extrabold tracking-tight sm:text-5xl"
          style={{ color: ACCENT_DARK }}
        >
          Contact Us
        </h1>

        <div className="mx-auto max-w-2xl">
          {/* ── Form ── */}
          <div
            className="rounded-2xl border p-8 shadow-sm"
            style={{ borderColor: `${ACCENT}66`, background: '#fff' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white text-2xl font-bold"
                  style={{ background: `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT_MID})` }}
                >
                  ✓
                </div>
                <h2 className="text-2xl font-bold" style={{ color: ACCENT_DARK }}>
                  Message sent!
                </h2>
                <p className="max-w-sm text-sm text-neutral-600">
                  Thanks for reaching out. We'll get back to you within a few business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-full px-6 py-2 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ background: ACCENT_DARK }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                      Contact Name <span style={{ color: ACCENT_DARK }}>*</span>
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border px-3 text-sm text-neutral-900 outline-none transition focus:ring-2"
                      style={{
                        borderColor: `${ACCENT}88`,
                        background: '#fafafa',
                      }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border px-3 text-sm text-neutral-900 outline-none transition focus:ring-2"
                      style={{ borderColor: `${ACCENT}88`, background: '#fafafa' }}
                      placeholder="+1 000-000-0000"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                    Email <span style={{ color: ACCENT_DARK }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border px-3 text-sm text-neutral-900 outline-none transition focus:ring-2"
                    style={{ borderColor: `${ACCENT}88`, background: '#fafafa' }}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Helper text */}
                <p className="text-xs font-medium text-neutral-500">
                  Help Us Understand Your Needs A Little More.
                </p>

                {/* Row 3: Org type + Subject */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                      What type of organization are you? <span style={{ color: ACCENT_DARK }}>*</span>
                    </label>
                    <select
                      name="orgType"
                      required
                      value={form.orgType}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border px-3 text-sm text-neutral-900 outline-none transition focus:ring-2"
                      style={{ borderColor: `${ACCENT}88`, background: '#fafafa' }}
                    >
                      {orgTypes.map((o) => (
                        <option key={o} value={o} disabled={o === 'Please Select'}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                      Subject: How may we help you? <span style={{ color: ACCENT_DARK }}>*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border px-3 text-sm text-neutral-900 outline-none transition focus:ring-2"
                      style={{ borderColor: `${ACCENT}88`, background: '#fafafa' }}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s} disabled={s === 'Please Select'}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-neutral-700">
                    Message / Comment <span style={{ color: ACCENT_DARK }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm text-neutral-900 outline-none transition focus:ring-2 resize-none"
                    style={{ borderColor: `${ACCENT}88`, background: '#fafafa' }}
                    placeholder="Tell us more about your request…"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="px-10 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                    style={{
                      background: ACCENT_DARK,
                      borderRadius: '6px',
                    }}
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
