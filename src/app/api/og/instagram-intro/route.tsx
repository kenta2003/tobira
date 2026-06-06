import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const W = 1080
const H = 1440

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? ''
  const sub = searchParams.get('sub') ?? ''
  const bodyRaw = searchParams.get('body') ?? ''
  const bg = searchParams.get('bg') ?? ''
  const num = searchParams.get('num') ?? ''
  const total = searchParams.get('total') ?? ''

  const bodyLines = bodyRaw ? bodyRaw.split('|').filter(Boolean) : []

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: '#0f172a',
        }}
      >
        {/* Background photo */}
        {bg ? (
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
        ) : null}

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: W,
            height: H,
            background: bg
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.72) 100%)'
              : 'linear-gradient(160deg, #0f172a 0%, #1a0a0a 50%, #0f172a 100%)',
            display: 'flex',
          }}
        />

        {/* Top bar: TOBIRA + slide counter */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 64,
            right: 64,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.35em',
              display: 'flex',
            }}
          >
            TOBIRA
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            {num && total ? `${num} / ${total}` : ''}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            position: 'absolute',
            top: 180,
            left: 80,
            right: 80,
            bottom: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          {/* Red accent line */}
          <div
            style={{
              width: 48,
              height: 3,
              background: '#dc2626',
              borderRadius: 2,
              marginBottom: 48,
              display: 'flex',
            }}
          />

          {/* Title */}
          {title ? (
            <div
              style={{
                fontSize: title.length > 30 ? 68 : 82,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: sub || bodyLines.length > 0 ? 28 : 0,
                display: 'flex',
              }}
            >
              {title}
            </div>
          ) : null}

          {/* Sub */}
          {sub ? (
            <div
              style={{
                fontSize: 38,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.4,
                marginBottom: bodyLines.length > 0 ? 48 : 0,
                display: 'flex',
              }}
            >
              {sub}
            </div>
          ) : null}

          {/* Body lines */}
          {bodyLines.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '3px solid #dc2626',
                paddingLeft: 32,
              }}
            >
              {bodyLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 34,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.45,
                    marginBottom: i < bodyLines.length - 1 ? 18 : 0,
                    display: 'flex',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { width: W, height: H }
  )
}
