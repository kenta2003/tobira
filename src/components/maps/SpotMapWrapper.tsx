'use client';

import SpotMap from './SpotMap';
import type { Spot } from '@/types';

type Props = {
  spot: Pick<Spot, 'name' | 'address' | 'google_maps_embed_url'>;
};

export default function SpotMapWrapper({ spot }: Props) {
  return <SpotMap spot={spot} />;
}
