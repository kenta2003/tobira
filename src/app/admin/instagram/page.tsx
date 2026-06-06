import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUserIds } from '@/lib/admin-utils'
import type { InstagramDraft } from '@/types/instagram'
import type { Metadata } from 'next'
import InstagramAdminClient from './InstagramAdminClient'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ status?: string }>
}

export default async function InstagramAdminPage({ searchParams }: Props) {
  const { status } = await searchParams

  // Check Supabase auth
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  // Verify user is an admin
  const adminIds = getAdminUserIds()
  if (!adminIds.includes(user.id)) {
    redirect('/')
  }

  const adminClient = createAdminClient()
  let query = adminClient
    .from('instagram_drafts')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && ['draft', 'approved', 'published', 'failed'].includes(status)) {
    query = query.eq('status', status)
  }

  const { data: drafts } = await query

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <InstagramAdminClient
        drafts={(drafts ?? []) as InstagramDraft[]}
        currentStatus={status}
      />
    </div>
  )
}
