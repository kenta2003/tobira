import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { validateImageUrl } from '@/lib/instagram/validateImageUrl'

export const runtime = 'edge'

const W = 1080
const H = 1440

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'Japan Beyond Tokyo'
  const tagline = searchParams.get('tagline') ?? ''
  const bgParam = searchParams.get('bg') ?? ''
  const bg = bgParam && validateImageUrl(bgParam) ? bgParam : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        {bg && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bg}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: W,
              height: H,
              objectFit: 'cover',
            }}
          />
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: W,
            height: H,
            background: bg
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)'
              : 'linear-gradient(160deg, #0f172a 0%, #1a0a0a 50%, #0f172a 100%)',
          }}
        />

        {/* Center content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 80px',
            width: '100%',
          }}
        >
          {/* TOBIRA */}
          <div
            style={{
              fontSize: '30px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.35em',
              marginBottom: '20px',
            }}
          >
            TOBIRA
          </div>

          {/* Red accent line */}
          <div
            style={{
              width: '48px',
              height: '3px',
              background: '#dc2626',
              borderRadius: '2px',
              marginBottom: '52px',
            }}
          />

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 35 ? '66px' : '78px',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.2,
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
            }}
          >
            {title}
          </div>

          {/* Tagline */}
          {tagline && (
            <div
              style={{
                marginTop: '40px',
                fontSize: '30px',
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: '800px',
              }}
            >
              {tagline}
            </div>
          )}
        </div>

      </div>
    ),
    { width: W, height: H }
  )
}
