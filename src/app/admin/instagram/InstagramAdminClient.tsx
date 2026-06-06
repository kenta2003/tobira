'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { InstagramDraft, SlideData } from '@/types/instagram'
import CarouselPreview from './CarouselPreview'
import { THEMES } from '@/lib/instagram/themes'

type PreviewSpot = {
  id: string
  name: string
  prefecture: string
  categories: string[]
  highlights: string
  image_url: string
}

type PreviewResult = {
  theme_key: string
  theme_title_ja: string
  theme_title_en: string
  tagline: string
  spots: PreviewSpot[]
}

type Props = {
  drafts: InstagramDraft[]
  currentStatus?: string
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
}

export default function InstagramAdminClient({ drafts, currentStatus }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<InstagramDraft | null>(drafts[0] ?? null)
  const [caption, setCaption] = useState(selected?.caption ?? '')
  const [generating, setGenerating] = useState(false)
  const [themeKey, setThemeKey] = useState(THEMES[0].theme_key)
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState<PreviewResult | null>(null)
  const [previewing, setPreviewing] = useState(false)
  const [scheduledFor, setScheduledFor] = useState('')
  const [hashtags, setHashtags] = useState<string[]>(selected?.hashtags ?? [])

  const apiHeaders = { 'Content-Type': 'application/json' }

  function selectDraft(draft: InstagramDraft) {
    setSelected(draft)
    setCaption(draft.caption)
    setMessage('')
    setHashtags(draft.hashtags ?? [])
    // scheduled_for を datetime-local 形式に変換（ローカル時刻）
    if (draft.scheduled_for) {
      const d = new Date(draft.scheduled_for)
      const pad = (n: number) => String(n).padStart(2, '0')
      setScheduledFor(
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
      )
    } else {
      setScheduledFor('')
    }
  }

  async function handlePreview() {
    setPreviewing(true)
    setMessage('')
    setPreview(null)
    try {
      const res = await fetch('/api/instagram/preview', {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ theme_key: themeKey }),
      })
      const json = await res.json() as PreviewResult & { error?: string }
      if (!res.ok) throw new Error(json.error ?? 'Preview failed')
      setPreview(json)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setPreviewing(false)
    }
  }

  async function handleGenerate() {
    setGenerating(true)
    setMessage('')
    setPreview(null)
    try {
      const res = await fetch('/api/instagram/generate', {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ theme_key: themeKey }),
      })
      const json = await res.json() as { ok?: boolean; error?: string; id?: string }
      if (!res.ok) throw new Error(json.error ?? 'Generate failed')
      setMessage(`ドラフト生成完了: ${json.id}`)
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setGenerating(false)
    }
  }

  async function handleSaveCaption() {
    if (!selected) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/instagram/drafts/${selected.id}`, {
        method: 'PATCH',
        headers: apiHeaders,
        body: JSON.stringify({ caption }),
      })
      const json = await res.json() as { ok?: boolean; error?: string }
      if (!res.ok) throw new Error(json.error)
      setMessage('キャプション保存完了')
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラー')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleApprove() {
    if (!selected) return
    setActionLoading(true)
    try {
      const payload: Record<string, unknown> = { status: 'approved' }
      if (scheduledFor) {
        payload.scheduled_for = new Date(scheduledFor).toISOString()
      }
      const res = await fetch(`/api/instagram/drafts/${selected.id}`, {
        method: 'PATCH',
        headers: apiHeaders,
        body: JSON.stringify(payload),
      })
      const json = await res.json() as { ok?: boolean; error?: string }
      if (!res.ok) throw new Error(json.error)
      setMessage(scheduledFor ? `承認・予約完了: ${new Date(scheduledFor).toLocaleString('ja-JP')}` : '承認しました')
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラー')
    } finally {
      setActionLoading(false)
    }
  }

  async function handlePublish() {
    if (!selected || selected.status !== 'approved') return
    if (!confirm('Instagram に投稿しますか？')) return
    setActionLoading(true)
    try {
      const res = await fetch('/api/instagram/publish', {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ id: selected.id }),
      })
      const json = await res.json() as { ok?: boolean; error?: string; ig_permalink?: string }
      if (!res.ok) throw new Error(json.error)
      setMessage(`投稿完了: ${json.ig_permalink}`)
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラー')
    } finally {
      setActionLoading(false)
    }
  }

  async function handleRetry() {
    if (!selected || selected.status !== 'failed') return
    if (!confirm('再試行しますか？')) return
    setActionLoading(true)
    setMessage('')
    try {
      // Reset to approved
      const resetRes = await fetch(`/api/instagram/drafts/${selected.id}`, {
        method: 'PATCH',
        headers: apiHeaders,
        body: JSON.stringify({ status: 'approved' }),
      })
      const resetJson = await resetRes.json() as { ok?: boolean; error?: string }
      if (!resetRes.ok) throw new Error(resetJson.error)

      // Immediately publish
      const pubRes = await fetch('/api/instagram/publish', {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ id: selected.id }),
      })
      const pubJson = await pubRes.json() as { ok?: boolean; error?: string; ig_permalink?: string }
      if (!pubRes.ok) throw new Error(pubJson.error)
      setMessage(`投稿完了: ${pubJson.ig_permalink}`)
      router.refresh()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'エラー')
      router.refresh()
    } finally {
      setActionLoading(false)
    }
  }

  const statusFilters = ['', 'draft', 'approved', 'published', 'failed'] as const

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Instagram Drafts</h1>
        <div className="flex gap-2 items-center">
          <select
            value={themeKey}
            onChange={e => { setThemeKey(e.target.value); setPreview(null) }}
            className="text-sm border rounded px-2 py-1.5 bg-white"
          >
            {THEMES.map(t => (
              <option key={t.theme_key} value={t.theme_key}>{t.theme_title_ja}</option>
            ))}
          </select>
          <button
            onClick={handlePreview}
            disabled={previewing || generating}
            className="px-4 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {previewing ? '確認中…' : 'プレビュー'}
          </button>
          {preview && (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {generating ? '生成中…' : '✓ 生成'}
            </button>
          )}
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 mb-4">
        {statusFilters.map(s => (
          <a
            key={s}
            href={`?${s ? `status=${s}` : ''}`}
            className={`px-3 py-1 text-sm rounded ${currentStatus === s || (!currentStatus && !s) ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border'}`}
          >
            {s || 'すべて'}
          </a>
        ))}
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded text-sm">{message}</div>
      )}

      {preview && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-gray-900 text-sm">{preview.theme_title_en}</p>
              <p className="text-xs text-gray-500 mt-0.5 italic">{preview.tagline}</p>
            </div>
            <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {preview.spots.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-4">{i + 1}.</span>
                <span className="font-medium text-gray-800">{s.name}</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-500">{s.prefecture}</span>
                <span className="text-xs text-gray-400">[{s.categories.join(', ')}]</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-amber-700 mt-3">このスポット構成で生成しますか？ →「✓ 生成」ボタンで確定</p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-4">
        {/* Draft list */}
        <div className="col-span-2 flex flex-col gap-2">
          {drafts.length === 0 && (
            <p className="text-gray-400 text-sm p-4">ドラフトがありません</p>
          )}
          {drafts.map(draft => (
            <button
              key={draft.id}
              onClick={() => selectDraft(draft)}
              className={`text-left p-3 rounded-xl border transition ${selected?.id === draft.id ? 'border-indigo-500 bg-indigo-50' : 'bg-white hover:border-gray-300'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm text-gray-900 truncate">
                  {draft.theme_title_ja}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[draft.status]}`}>
                  {draft.status}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {(draft.slide_data as SlideData[]).length}枚
                {draft.scheduled_for && ` · 🕐 ${new Date(draft.scheduled_for).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`}
                {draft.likes_count != null && ` · ❤${draft.likes_count} 💬${draft.comments_count ?? 0}`}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="col-span-3 bg-white rounded-xl border p-4">
          {!selected ? (
            <p className="text-gray-400 text-sm">左からドラフトを選択</p>
          ) : (
            <div className="flex flex-col gap-4">
              <CarouselPreview
                slides={selected.slide_data as SlideData[]}
                themeTitle={selected.theme_title_ja}
              />

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Caption</label>
                <textarea
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                  rows={6}
                  className="w-full text-sm border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex justify-end mt-1">
                  <button
                    onClick={handleSaveCaption}
                    disabled={actionLoading}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    保存
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Hashtags</label>
                <textarea
                  value={hashtags.join(' ')}
                  onChange={e => setHashtags(e.target.value.trim().split(/\s+/).filter(Boolean))}
                  rows={3}
                  placeholder="japantravel hiddenjapan ..."
                  className="w-full text-sm border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex justify-end mt-1">
                  <button
                    onClick={async () => {
                      if (!selected) return
                      setActionLoading(true)
                      try {
                        const res = await fetch(`/api/instagram/drafts/${selected.id}`, {
                          method: 'PATCH',
                          headers: apiHeaders,
                          body: JSON.stringify({ hashtags }),
                        })
                        const json = await res.json() as { ok?: boolean; error?: string }
                        if (!res.ok) throw new Error(json.error)
                        setMessage('ハッシュタグ保存完了')
                        router.refresh()
                      } catch (err) {
                        setMessage(err instanceof Error ? err.message : 'エラー')
                      } finally {
                        setActionLoading(false)
                      }
                    }}
                    disabled={actionLoading}
                    className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    保存
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                {selected.status === 'draft' && (
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 whitespace-nowrap">投稿日時</label>
                      <input
                        type="datetime-local"
                        value={scheduledFor}
                        onChange={e => setScheduledFor(e.target.value)}
                        className="flex-1 text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>
                    <button
                      onClick={handleApprove}
                      disabled={actionLoading}
                      className="py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {scheduledFor ? `${new Date(scheduledFor).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} に予約して承認` : '承認（即時投稿）'}
                    </button>
                  </div>
                )}
                {selected.status === 'approved' && (
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500 whitespace-nowrap">投稿日時</label>
                      <input
                        type="datetime-local"
                        value={scheduledFor}
                        onChange={e => setScheduledFor(e.target.value)}
                        className="flex-1 text-xs border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                      />
                      <button
                        onClick={async () => {
                          setActionLoading(true)
                          try {
                            const res = await fetch(`/api/instagram/drafts/${selected.id}`, {
                              method: 'PATCH',
                              headers: apiHeaders,
                              body: JSON.stringify({ scheduled_for: scheduledFor ? new Date(scheduledFor).toISOString() : null }),
                            })
                            const json = await res.json() as { ok?: boolean; error?: string }
                            if (!res.ok) throw new Error(json.error)
                            setMessage(scheduledFor ? `予約設定: ${new Date(scheduledFor).toLocaleString('ja-JP')}` : '予約解除しました')
                            router.refresh()
                          } catch (err) {
                            setMessage(err instanceof Error ? err.message : 'エラー')
                          } finally {
                            setActionLoading(false)
                          }
                        }}
                        disabled={actionLoading}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded whitespace-nowrap"
                      >
                        設定
                      </button>
                    </div>
                    <button
                      onClick={handlePublish}
                      disabled={actionLoading || !!scheduledFor}
                      className="py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {scheduledFor ? `🕐 ${new Date(scheduledFor).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} に自動投稿` : 'Instagram に投稿 ↑'}
                    </button>
                  </div>
                )}
                {selected.status === 'failed' && (
                  <button
                    onClick={handleRetry}
                    disabled={actionLoading}
                    className="flex-1 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 disabled:opacity-50"
                  >
                    {actionLoading ? '再試行中…' : '再試行 ↑'}
                  </button>
                )}
                {selected.ig_permalink && (
                  <a
                    href={selected.ig_permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 text-sm text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50"
                  >
                    投稿を見る
                  </a>
                )}
              </div>

              {selected.error_message && (
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  エラー: {selected.error_message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
