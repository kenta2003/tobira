'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-stone-900">
            tobira
          </Link>
          <p className="mt-2 text-stone-500 text-sm">Reset your password</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <p className="text-green-800 font-medium mb-1">Check your email</p>
              <p className="text-green-700 text-sm">
                We sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            <Link href="/login" className="text-sm text-red-600 hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">
              Remember your password?{' '}
              <Link href="/login" className="text-red-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
