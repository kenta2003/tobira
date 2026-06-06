import type { Spot } from '@/types';

type Props = {
  spot: Pick<Spot, 'name' | 'address' | 'google_maps_embed_url'>;
};

export default function SpotMap({ spot }: Props) {
  const src = spot.google_maps_embed_url
    ?? `https://maps.google.com/maps?q=${encodeURIComponent(spot.name + ' ' + spot.address)}&output=embed&hl=en`;

  return (
    <iframe
      src={src}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
