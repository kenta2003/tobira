'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { normalizePrefectureName } from '@/lib/regions';

const GEO_URL = '/japan.topojson';

const GEO_STYLE = {
  default: { outline: 'none' },
  hover:   { outline: 'none' },
  pressed: { outline: 'none' },
};

type Props = {
  prefecture: string;
};

// 沖縄記事は全体表示、それ以外は本島フォーカス
const PROJECTION: Record<string, { center: [number, number]; scale: number }> = {
  default:  { center: [137.0, 37.5], scale: 680 },
  Okinawa:  { center: [132.0, 31.5], scale: 400 },
};

export default function JapanContextMap({ prefecture }: Props) {
  const proj = PROJECTION[prefecture] ?? PROJECTION.default;

  return (
    <div style={{ width: '100%', height: '100%', background: '#bfdbfe', borderRadius: 12, overflow: 'hidden' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={proj}
        width={260}
        height={285}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL} parseGeographies={(geos) => geos}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const nam: string = geo.properties?.nam ?? '';
              const name = normalizePrefectureName(nam);
              const isTarget = name === prefecture;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isTarget ? '#dc2626' : '#e7e5e4'}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={GEO_STYLE}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
