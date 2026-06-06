import type { SlideData, PublishResult, InsightsResult } from '@/types/instagram'

const GRAPH_BASE = 'https://graph.instagram.com/v21.0'
const HOURS_24 = 24 * 60 * 60 * 1000

async function graphPost<T>(url: string, body: Record<string, string>, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Instagram API error ${res.status}: ${JSON.stringify(err)}`)
  }
  return res.json() as Promise<T>
}

async function graphGet<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) {
    throw new Error(`Instagram API error ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function publishCarousel(
  userId: string,
  token: string,
  caption: string,
  slides: SlideData[],
): Promise<PublishResult> {
  // Step 1: create a container for each slide image
  const containerIds: string[] = []
  for (const slide of slides) {
    const data = await graphPost<{ id: string }>(`${GRAPH_BASE}/${userId}/media`, {
      image_url: slide.image_url,
      is_carousel_item: 'true',
    }, token)
    containerIds.push(data.id)
  }

  // Step 2: create carousel container
  const carousel = await graphPost<{ id: string }>(`${GRAPH_BASE}/${userId}/media`, {
    media_type: 'CAROUSEL',
    children: containerIds.join(','),
    caption,
  }, token)

  // Wait for Instagram to process the carousel container
  await new Promise(resolve => setTimeout(resolve, 5000))

  // Step 3: publish
  const published = await graphPost<{ id: string }>(`${GRAPH_BASE}/${userId}/media_publish`, {
    creation_id: carousel.id,
  }, token)

  // Fetch permalink
  const permalink = await fetchPermalink(published.id, token)

  return { ig_media_id: published.id, ig_permalink: permalink }
}

export async function publishStory(
  userId: string,
  token: string,
  imageUrl: string,
): Promise<PublishResult> {
  const container = await graphPost<{ id: string }>(`${GRAPH_BASE}/${userId}/media`, {
    image_url: imageUrl,
    media_type: 'STORIES',
  }, token)

  const published = await graphPost<{ id: string }>(`${GRAPH_BASE}/${userId}/media_publish`, {
    creation_id: container.id,
  }, token)

  const permalink = await fetchPermalink(published.id, token)
  return { ig_media_id: published.id, ig_permalink: permalink }
}

async function fetchPermalink(mediaId: string, token: string): Promise<string> {
  try {
    const data = await graphGet<{ permalink?: string }>(`${GRAPH_BASE}/${mediaId}?fields=permalink`, token)
    return data.permalink ?? ''
  } catch {
    return ''
  }
}

export async function fetchInsights(
  mediaId: string,
  token: string,
  publishedAt: string,
): Promise<InsightsResult> {
  const elapsed = Date.now() - new Date(publishedAt).getTime()
  if (elapsed < HOURS_24) return null

  try {
    const json = await graphGet<{ data: Array<{ name: string; values: Array<{ value: number }> }> }>(
      `${GRAPH_BASE}/${mediaId}/insights?metric=likes,comments,reach,impressions`,
      token
    )
    const get = (name: string) => json.data.find(d => d.name === name)?.values[0]?.value ?? 0

    return {
      likes_count: get('likes'),
      comments_count: get('comments'),
      reach: get('reach'),
      impressions: get('impressions'),
    }
  } catch {
    return null
  }
}
