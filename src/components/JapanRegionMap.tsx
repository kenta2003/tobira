'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import {
  REGION_META,
  REGION_IDS,
  PREFECTURE_TO_REGION,
  normalizePrefectureName,
  type RegionId,
} from '@/lib/regions';
import type { Prefecture } from '@/types';

const GEO_URL = '/japan.topojson';

// Region name labels at geographic centroids [lng, lat]
const REGION_LABEL_POSITIONS: { id: RegionId; coordinates: [number, number] }[] = [
  { id: 'hokkaido', coordinates: [142.8, 44.2]  },
  { id: 'tohoku',   coordinates: [141.2, 40.0]  },
  { id: 'kanto',    coordinates: [139.5, 36.5]  },
  { id: 'hokuriku', coordinates: [135.8, 37.3]  },
  { id: 'chubu',    coordinates: [137.6, 36.1]  },
  { id: 'kinki',    coordinates: [136.4, 34.4]  },
  { id: 'chugoku',  coordinates: [131.8, 35.1]  },
  { id: 'shikoku',  coordinates: [133.5, 33.4]  },
  { id: 'kyushu',   coordinates: [131.0, 32.0]  },
  { id: 'okinawa',  coordinates: [127.8, 26.3]  },
];

// Major city labels shown on the map [lng, lat]
const CITY_LABELS: { name: string; coordinates: [number, number]; dx?: number; dy?: number }[] = [
  { name: 'Sapporo',   coordinates: [141.35, 43.06], dy: -5 },
  { name: 'Sendai',    coordinates: [140.87, 38.27], dx: 6 },
  { name: 'Tokyo',     coordinates: [139.69, 35.69], dx: 6 },
  { name: 'Nagoya',    coordinates: [136.90, 35.18], dx: 6 },
  { name: 'Osaka',     coordinates: [135.50, 34.69], dx: -6 },
  { name: 'Hiroshima', coordinates: [132.46, 34.39], dy: -5 },
  { name: 'Fukuoka',   coordinates: [130.40, 33.59], dx: -6 },
];

// Prefecture taglines
const PREFECTURE_TAGLINES: Partial<Record<Prefecture, string>> = {
  Hokkaido: 'Lavender Fields & Wild Frontiers',
  Aomori: 'Sacred Mountains & Apple Blossoms',
  Iwate: 'Golden Temples & Hidden Gorges',
  Miyagi: 'Island Bays & Samurai Coast',
  Akita: 'Samurai Towns & Volcanic Lakes',
  Yamagata: 'Snow Onsen & Mountain Shrines',
  Fukushima: 'Castle Towns & Emerald Lakes',
  Tokyo: 'Megacity, Temples & Hidden Alleys',
  Kanagawa: 'Samurai History & Mountain Bays',
  Saitama: 'Ancient Tombs & Edo Canals',
  Chiba: 'Pacific Coast & Hidden Waterfalls',
  Ibaraki: 'Plum Blossoms & Coastal Dunes',
  Tochigi: 'UNESCO Shrines & Onsen Gorges',
  Gunma: 'Silk Road & Mountain Hot Springs',
  Niigata: 'Rice, Sake & Japan Sea Coast',
  Toyama: 'Black Dam & Northern Alps',
  Ishikawa: 'Geisha Districts & Wild Coastlines',
  Fukui: 'Dinosaur Country & Cliffside Coasts',
  Aichi: 'Rivers, Castles & Meiji Heritage',
  Shizuoka: 'Mt Fuji Views & Hot Spring Valleys',
  Nagano: 'Alpine Valleys & Snow Monkeys',
  Gifu: 'Thatched Villages & Mountain Streams',
  Yamanashi: 'Fuji Five Lakes & Wine Country',
  Osaka: 'Street Food, Neon & Ancient Shrines',
  Kyoto: 'Temples, Geisha & Hidden Gardens',
  Nara: 'Sacred Deer & Ancient Capitals',
  Hyogo: 'Hot Springs, Clouds & Castle Towns',
  Shiga: 'Lake Country & Samurai Castles',
  Wakayama: 'Sacred Mountains & Ocean Trails',
  Mie: "Japan's Holiest Shrine & Pearl Bays",
  Hiroshima: 'Peace, Islands & Inland Sea',
  Yamaguchi: 'Torii Cliffs & Karst Caves',
  Okayama: 'Canal Districts & Garden Art',
  Tottori: 'Sand Dunes & Sacred Peaks',
  Shimane: 'Ancient Shrines & Silver Mines',
  Ehime: 'Oldest Onsen & Island Cycling',
  Kochi: 'Wild Rivers & Pacific Coast',
  Tokushima: 'Whirlpools & Vine Bridges',
  Kagawa: 'Art Islands & Sacred Stairs',
  Fukuoka: 'Ramen, Shrines & City Life',
  Saga: 'Pottery & Ancient Ruins',
  Nagasaki: 'History, Islands & Peace',
  Kumamoto: 'Volcanoes & Onsen',
  Oita: 'Hot Springs & Highlands',
  Miyazaki: 'Myth & Pacific Coast',
  Kagoshima: 'Sakurajima & Wild South',
  Okinawa: 'Coral Reefs & Ryukyu Culture',
};

const SB = (slug: string) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''}/storage/v1/object/public/spot-images/${slug}.jpg`;

type Props = {
  spotCountByPrefecture: Partial<Record<Prefecture, number>>;
};

export default function JapanRegionMap({ spotCountByPrefecture }: Props) {
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);

  const selectedMeta = selectedRegion ? REGION_META[selectedRegion] : null;

  const handleGeoEnter = (nam: string) => {
    const pref = normalizePrefectureName(nam);
    setHoveredRegion(PREFECTURE_TO_REGION[pref] ?? null);
  };

  const handleGeoLeave = () => setHoveredRegion(null);

  const handleGeoClick = (nam: string) => {
    const pref = normalizePrefectureName(nam);
    const region = PREFECTURE_TO_REGION[pref];
    if (region) setSelectedRegion(region);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full">

      {/* ─── Left: SVG map ───────────────────────────── */}
      <div className="w-full lg:w-[56%] flex-shrink-0">
        {/* Hover label */}
        <div className="h-7 mb-1 flex items-center">
          {hoveredRegion && (
            <span
              className="text-sm font-semibold px-2.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: REGION_META[hoveredRegion].color }}
            >
              {REGION_META[hoveredRegion].label}
            </span>
          )}
        </div>

        <div
          className="rounded-2xl overflow-hidden border border-stone-200 bg-[#bfdbfe] cursor-pointer"
          onClick={() => !hoveredRegion && setSelectedRegion(null)}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1100, center: [136.5, 34.8] }}
            width={520}
            height={570}
            style={{ width: '100%', height: 'auto' }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const prefName = normalizePrefectureName(geo.properties.nam as string);
                  const region = PREFECTURE_TO_REGION[prefName];
                  const meta = region ? REGION_META[region] : null;
                  const isActive =
                    region && (hoveredRegion === region || selectedRegion === region);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={meta ? (isActive ? meta.hoverColor : meta.color) : '#cbd5e1'}
                      stroke="white"
                      strokeWidth={0.6}
                      style={{
                        default: { outline: 'none', transition: 'fill 120ms ease' },
                        hover: { outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={() => handleGeoEnter(geo.properties.nam as string)}
                      onMouseLeave={handleGeoLeave}
                      onClick={() => handleGeoClick(geo.properties.nam as string)}
                    />
                  );
                })
              }
            </Geographies>

            {/* Region name labels */}
            {REGION_LABEL_POSITIONS.map(({ id, coordinates }) => (
              <Marker
                key={`region-${id}`}
                coordinates={coordinates}
                style={{ default: { pointerEvents: 'none' } }}
              >
                <text
                  textAnchor="middle"
                  fontSize={8}
                  fontWeight={800}
                  fill="white"
                  stroke="rgba(0,0,0,0.65)"
                  strokeWidth={2.5}
                  paintOrder="stroke"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {REGION_META[id].label}
                </text>
              </Marker>
            ))}

            {/* City labels */}
            {CITY_LABELS.map((city) => (
              <Marker
                key={city.name}
                coordinates={city.coordinates}
                style={{ default: { pointerEvents: 'none' } }}
              >
                <circle r={1.8} fill="white" opacity={0.8} />
                <text
                  x={city.dx ?? 0}
                  y={city.dy ?? -5}
                  textAnchor={city.dx && city.dx < 0 ? 'end' : city.dx && city.dx > 0 ? 'start' : 'middle'}
                  fontSize={6}
                  fontWeight={600}
                  fill="white"
                  stroke="rgba(0,0,0,0.5)"
                  strokeWidth={1.8}
                  paintOrder="stroke"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {city.name}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        <p className="text-xs text-stone-400 text-center mt-2">
          Click a region to explore prefectures
        </p>
      </div>

      {/* ─── Right: region list or prefecture panel ─── */}
      <div className="w-full lg:w-[44%]">
        {selectedRegion && selectedMeta ? (
          /* Prefecture panel */
          <div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-4 transition-colors"
            >
              <ArrowLeft size={14} />
              All regions
            </button>

            <div className="flex items-center gap-2.5 mb-1.5">
              <span
                className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedMeta.color }}
              />
              <h3 className="font-bold text-stone-900 text-xl">{selectedMeta.label}</h3>
            </div>
            <p className="text-stone-500 text-sm mb-4 leading-relaxed">{selectedMeta.tagline}</p>

            <div className="grid grid-cols-2 gap-3">
              {selectedMeta.prefectures.map((pref) => {
                const count = spotCountByPrefecture[pref as Prefecture] ?? 0;
                const slug = pref.toLowerCase();
                const tagline = PREFECTURE_TAGLINES[pref as Prefecture] ?? '';
                return (
                  <Link
                    key={pref}
                    href={`/guides/${slug}`}
                    className="group rounded-xl overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all block"
                  >
                    <div className="relative h-24 bg-stone-200 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={SB(slug)}
                        alt={pref}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-0.5">
                        <ArrowRight size={12} className="text-stone-800" />
                      </div>
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-baseline justify-between gap-1">
                        <p className="text-sm font-bold text-stone-900 leading-tight truncate">{pref}</p>
                        <p className="text-[10px] text-stone-400 flex-shrink-0">{count} spots</p>
                      </div>
                      {tagline && (
                        <p className="text-[10px] text-stone-500 leading-tight mt-0.5 line-clamp-2">
                          {tagline}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          /* Default: 10 region list */
          <div>
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Select a region
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {REGION_IDS.map((id) => {
                const meta = REGION_META[id];
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedRegion(id)}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-colors text-left"
                  >
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-800 group-hover:text-stone-900 truncate">
                        {meta.label}
                      </p>
                      <p className="text-xs text-stone-400">
                        {meta.cities.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
