'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const subject = (formData.get('subject') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    subject: subject || null,
    message,
  })

  if (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  // Send email notification via Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'tobira <noreply@tobira-travel.com>',
      to: 'contact@tobira-travel.com',
      replyTo: email,
      subject: `[tobira contact] ${subject || 'New message'} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }).catch((err) => console.error('Resend error:', err))
  }

  return { success: true }
}
