import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAllSpots } from '@/lib/spots';
import SpotCard from '@/components/SpotCard';

export const metadata = { title: 'Saved Spots — tobira' };

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const adminClient = createAdminClient();
  const [{ data: favRows }, allSpots] = await Promise.all([
    adminClient
      .from('favorites')
      .select('spot_id')
      .eq('user_id', user.id),
    getAllSpots(),
  ]);

  const favIds = new Set((favRows ?? []).map((r) => r.spot_id));
  const favoriteSpots = allSpots.filter((s) => favIds.has(s.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">Saved Spots</h1>
        <p className="text-stone-500 text-sm">
          {favoriteSpots.length} spot{favoriteSpots.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {favoriteSpots.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-lg font-medium mb-2">No saved spots yet</p>
          <p className="text-sm mb-6">Tap the heart on any spot to save it here.</p>
          <Link
            href="/spots"
            className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Explore Spots
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} isFavorited={true} backHref="/favorites" />
          ))}
        </div>
      )}
    </div>
  );
}
