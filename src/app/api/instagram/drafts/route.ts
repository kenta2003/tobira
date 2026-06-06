import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import type { DraftStatus } from '@/types/instagram'

const VALID_STATUSES: DraftStatus[] = ['draft', 'approved', 'published', 'failed']

export async function GET(req: NextRequest) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  const status = req.nextUrl.searchParams.get('status') as DraftStatus | null

  const supabase = createAdminClient()
  let query = supabase
    .from('instagram_drafts')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) {
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 })
    }
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ drafts: data })
}
