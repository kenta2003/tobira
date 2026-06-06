'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';
import 'leaflet/dist/leaflet.css';
import { fixLeafletIcons } from '@/lib/leaflet-icon-fix';
import type { Spot } from '@/types';

type Props = {
  spots: Spot[];
};

// Center of Kyushu
const KYUSHU_CENTER: [number, number] = [32.8, 131.0];

export default function SpotsMapView({ spots }: Props) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={KYUSHU_CENTER}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.lat, spot.lng]}>
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold text-stone-900 mb-0.5">{spot.name}</p>
              <p className="text-stone-500 text-xs mb-2">{spot.prefecture}, Kyushu</p>
              <Link
                href={`/spots/${spot.id}`}
                className="text-xs text-red-600 hover:underline"
              >
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
