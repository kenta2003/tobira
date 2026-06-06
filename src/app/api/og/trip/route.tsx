import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'My Kyushu Trip';
  const days = searchParams.get('days') ?? '1';
  const image = searchParams.get('image') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        {image ? (
          <img
            src={image}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#1c1917',
            }}
          />
        )}

        {/* Gradient overlay: transparent top → nearly opaque bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.80) 62%, rgba(0,0,0,0.96) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 68px',
            width: '100%',
          }}
        >
          {/* Top: brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
            <span
              style={{
                color: '#ffffff',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                fontFamily: 'sans-serif',
              }}
            >
              tobira
            </span>
          </div>

          {/* Bottom: title + meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                color: '#ffffff',
                fontSize: title.length > 50 ? '52px' : '60px',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                fontFamily: 'sans-serif',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              {title}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '999px',
                    padding: '7px 18px',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 500,
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <span style={{ color: '#ef4444' }}>●</span>
                  {days} {parseInt(days) === 1 ? 'day' : 'days'}
                </div>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '999px',
                    padding: '7px 18px',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 500,
                    fontFamily: 'sans-serif',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  Kyushu &amp; Okinawa, Japan
                </div>
              </div>
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '17px',
                  fontFamily: 'sans-serif',
                  fontWeight: 400,
                }}
              >
                tobira-travel.com
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
