import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAdminUserIds } from '@/lib/admin-utils'

export async function checkInstagramAdmin(req: NextRequest): Promise<NextResponse | null> {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if user is an admin
  const adminIds = getAdminUserIds()
  if (!adminIds.includes(user.id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return null
}

/**
 * @deprecated Use checkInstagramAdmin instead. Secret-based auth is insecure.
 */
export function checkInstagramSecret(req: NextRequest): NextResponse | null {
  const secret = req.headers.get('x-instagram-secret')
  const expected = process.env.INSTAGRAM_ADMIN_SECRET
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
