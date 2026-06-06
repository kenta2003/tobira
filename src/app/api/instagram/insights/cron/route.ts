import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  // Authorization check
  const authHeader = req.headers.get('authorization')
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

  if (!authHeader || authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Fetch all published drafts with ig_media_id
    const { data: drafts, error: fetchError } = await supabase
      .from('instagram_drafts')
      .select('id, ig_media_id')
      .eq('status', 'published')
      .not('ig_media_id', 'is', null)

    if (fetchError) throw fetchError
    if (!drafts || drafts.length === 0) {
      return NextResponse.json({ message: 'No published drafts to fetch insights for' })
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    if (!accessToken) {
      throw new Error('INSTAGRAM_ACCESS_TOKEN not configured')
    }

    const updates = []

    // Fetch insights for each media
    for (const draft of drafts) {
      try {
        const insightsUrl = new URL(
          `https://graph.instagram.com/v19.0/${draft.ig_media_id}/insights`
        )
        insightsUrl.searchParams.append('metric', 'likes,comments,saved,total_interactions,reach')

        const insightsRes = await fetch(insightsUrl.toString(), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!insightsRes.ok) {
          console.warn(`Failed to fetch insights for ${draft.ig_media_id}: ${insightsRes.status}`)
          continue
        }

        const insightsData = await insightsRes.json() as {
          data?: Array<{ name: string; values: Array<{ value: number }> }>
        }

        if (!insightsData.data) {
          console.warn(`No insights data for ${draft.ig_media_id}`)
          continue
        }

        // Parse insights
        let likesCount = 0
        let impressions = 0
        let reach = 0
        let saved = 0

        for (const metric of insightsData.data) {
          const value = metric.values?.[0]?.value ?? 0

          if (metric.name === 'engagement') likesCount = value
          if (metric.name === 'impressions') impressions = value
          if (metric.name === 'reach') reach = value
          if (metric.name === 'saved') saved = value
        }

        updates.push({
          id: draft.id,
          likes_count: likesCount,
          impressions,
          reach,
          comments_count: 0, // Instagram API doesn't provide comments directly from /insights
          insights_fetched_at: new Date().toISOString(),
        })
      } catch (err) {
        console.error(`Error fetching insights for ${draft.ig_media_id}:`, err)
      }
    }

    // Update database
    for (const update of updates) {
      const { error: updateError } = await supabase
        .from('instagram_drafts')
        .update({
          likes_count: update.likes_count,
          impressions: update.impressions,
          reach: update.reach,
          comments_count: update.comments_count,
          insights_fetched_at: update.insights_fetched_at,
        })
        .eq('id', update.id)

      if (updateError) {
        console.error(`Failed to update insights for ${update.id}:`, updateError)
      }
    }

    return NextResponse.json({
      ok: true,
      message: `Updated insights for ${updates.length} drafts`,
      updated: updates.length,
    })
  } catch (err) {
    console.error('Insights cron error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
