const ALLOWED_HOSTS = [
  /^[a-z0-9-]+\.supabase\.co$/,
  /^images\.unsplash\.com$/,
  /^plus\.unsplash\.com$/,
]

export function validateImageUrl(url: string): boolean {
  if (!url) return false

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return false
  }

  if (parsed.protocol !== 'https:') return false

  const host = parsed.hostname
  if (host === 'localhost' || host === '127.0.0.1') return false

  return ALLOWED_HOSTS.some(pattern => pattern.test(host))
}
