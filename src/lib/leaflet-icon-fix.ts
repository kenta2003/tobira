import L from 'leaflet';

// Leaflet's default marker icon breaks in bundled environments because
// it uses __webpack_public_path__ internally. This patch replaces the
// broken auto-detect with explicit CDN URLs.
export function fixLeafletIcons() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}
