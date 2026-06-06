'use client'

import { useActionState } from 'react'
import { submitContact, type ContactFormState } from './actions'

const initialState: ContactFormState = { success: false }

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState)

  if (state.success) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Message sent</h1>
          <p className="text-stone-500">
            Thanks for reaching out. We read every message and will get back to you
            as soon as possible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase mb-4">
          tobira beyond tokyo
        </p>
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Get in touch</h1>
        <p className="text-stone-500 mb-12">
          Have a question, found an error in our guides, or just want to say hi?
          We read every message.
        </p>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10">
          <form action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors text-sm"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors text-sm resize-none"
                placeholder="Your message..."
              />
            </div>

            {state.error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors text-sm"
            >
              {isPending ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
