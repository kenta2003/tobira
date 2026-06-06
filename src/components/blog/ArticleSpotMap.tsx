'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { fixLeafletIcons } from '@/lib/leaflet-icon-fix';
import type { Spot } from '@/types';

type Props = {
  spots: Pick<Spot, 'id' | 'name' | 'prefecture' | 'lat' | 'lng'>[];
  slug: string;
};

// 全マーカーが収まるように自動ズーム
function FitBounds({ spots }: { spots: Props['spots'] }) {
  const map = useMap();
  useEffect(() => {
    if (spots.length === 1) {
      map.setView([spots[0].lat, spots[0].lng], 11);
    } else {
      const bounds = spots.map((s) => [s.lat, s.lng] as [number, number]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, spots]);
  return null;
}

export default function ArticleSpotMap({ spots, slug }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fixLeafletIcons();
    return () => {
      // Leaflet が container に付けた _leaflet_id を削除してインスタンスの再利用エラーを防ぐ
      if (containerRef.current) {
        const el = containerRef.current.querySelector('.leaflet-container');
        if (el) delete (el as HTMLElement & { _leaflet_id?: number })._leaflet_id;
      }
    };
  }, []);

  const validSpots = spots.filter((s) => s.lat && s.lng);
  if (validSpots.length === 0) return null;

  // 初期center/zoomは暫定値（FitBoundsが上書きする）
  const initialCenter: [number, number] = [
    validSpots.reduce((s, p) => s + p.lat, 0) / validSpots.length,
    validSpots.reduce((s, p) => s + p.lng, 0) / validSpots.length,
  ];

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
    <MapContainer
      center={initialCenter}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds spots={validSpots} />
      {validSpots.map((spot, i) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>
            <div className="min-w-[160px]">
              <p className="text-xs text-stone-400 mb-0.5">{i + 1}</p>
              <p className="font-semibold text-stone-900 mb-0.5">{spot.name}</p>
              <p className="text-stone-500 text-xs mb-2">{spot.prefecture}</p>
              <Link
                href={`/spots/${spot.id}?back=${encodeURIComponent(`/blog/${slug}`)}`}
                className="text-xs text-red-600 hover:underline"
              >
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}
