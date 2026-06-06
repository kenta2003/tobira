import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier for the rate limit (e.g., user ID, IP)
 * @param limit - Maximum number of requests allowed
 * @param window - Time window in seconds
 * @returns null if request is allowed, NextResponse with 429 if limited
 */
export async function checkRateLimit(
  key: string,
  limit: number = 5,
  window: number = 60,
): Promise<NextResponse | null> {
  // Check if Upstash is configured
  const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

  // If Upstash is not configured, allow all requests (development mode)
  if (!hasUpstash) {
    console.warn('Upstash Redis not configured for rate limiting (development mode)');
    return null;
  }

  try {
    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(limit, `${window}s`),
    });

    const result = await ratelimit.limit(key);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    return null;
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Fail closed: on error, deny the request (production safety)
    return NextResponse.json(
      { error: 'Rate limit service unavailable. Please try again later.' },
      { status: 503 },
    );
  }
}

/**
 * Get rate limit key from request (prioritize user ID, fall back to IP)
 */
export function getRateLimitKey(userId: string | null, req: NextRequest): string {
  if (userId) return `user:${userId}`;

  // Fall back to IP address
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';

  return `ip:${ip}`;
}
