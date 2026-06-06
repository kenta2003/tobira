import { NextRequest, NextResponse } from 'next/server'
import { checkInstagramAdmin } from '@/lib/instagram/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  const { id } = await params
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('instagram_drafts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ draft: data })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await checkInstagramAdmin(req)
  if (authError) return authError

  const { id } = await params
  const body = await req.json().catch(() => null) as {
    caption?: string
    hashtags?: string[]
    status?: 'approved' | 'draft'
    scheduled_for?: string | null
  } | null

  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const updates: Record<string, unknown> = {}
  if (typeof body.caption === 'string') updates.caption = body.caption
  if (Array.isArray(body.hashtags)) updates.hashtags = body.hashtags
  if (body.status === 'approved' || body.status === 'draft') {
    updates.status = body.status
    if (body.status === 'approved') {
      updates.approved_at = new Date().toISOString()
    }
  }
  if ('scheduled_for' in body) {
    updates.scheduled_for = body.scheduled_for ?? null
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('instagram_drafts')
    .update(updates)
    .eq('id', id)
    .select('id, status, caption, hashtags')
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found or update failed' }, { status: 404 })
  return NextResponse.json({ ok: true, draft: data })
}
