#!/usr/bin/env node

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = dirname(__dirname)

dotenv.config({ path: join(rootDir, '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function exportInsights() {
  try {
    console.log('📊 Fetching Instagram insights...')

    const { data: drafts, error } = await supabase
      .from('instagram_drafts')
      .select('id, theme_key, theme_title_ja, status, published_at, likes_count, comments_count, impressions, reach, insights_fetched_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    if (!drafts || drafts.length === 0) {
      console.log('❌ No published drafts found')
      process.exit(0)
    }

    // Create output directory
    const outputDir = join(__dirname, 'output', 'instagram-insights')
    mkdirSync(outputDir, { recursive: true })

    // Generate CSV
    const headers = [
      'ID',
      'Theme',
      'Theme (Japanese)',
      'Status',
      'Published At',
      'Likes',
      'Comments',
      'Impressions',
      'Reach',
      'Insights Fetched',
    ]

    const rows = drafts.map(d => [
      d.id,
      d.theme_key,
      d.theme_title_ja,
      d.status,
      d.published_at ? new Date(d.published_at).toLocaleString('ja-JP') : '—',
      d.likes_count ?? '—',
      d.comments_count ?? '—',
      d.impressions ?? '—',
      d.reach ?? '—',
      d.insights_fetched_at ? new Date(d.insights_fetched_at).toLocaleString('ja-JP') : '—',
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row =>
        row.map(cell => {
          // Escape commas and quotes in CSV
          if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
            return `"${cell.replace(/"/g, '""')}"`
          }
          return cell
        }).join(',')
      ),
    ].join('\n')

    // Save file
    const timestamp = new Date().toISOString().split('T')[0]
    const filePath = join(outputDir, `insights-${timestamp}.csv`)
    writeFileSync(filePath, csv, 'utf-8')

    console.log(`✅ Insights exported to: ${filePath}`)
    console.log(`📈 Total posts: ${drafts.length}`)
    console.log('\n📊 Summary:')
    const totalLikes = drafts.reduce((sum, d) => sum + (d.likes_count ?? 0), 0)
    const totalImpressions = drafts.reduce((sum, d) => sum + (d.impressions ?? 0), 0)
    const totalReach = drafts.reduce((sum, d) => sum + (d.reach ?? 0), 0)
    console.log(`  Total Likes: ${totalLikes}`)
    console.log(`  Total Impressions: ${totalImpressions}`)
    console.log(`  Total Reach: ${totalReach}`)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

exportInsights()
