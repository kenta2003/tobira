'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

type Props = {
  spotId: string;
  initialFavorited: boolean;
  /** Override positional classes. Default: 'absolute bottom-3 right-3' (card usage) */
  className?: string;
};

export default function FavoriteButton({ spotId, initialFavorited, className }: Props) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic update — flip immediately, revert on error
    const next = !favorited;
    setFavorited(next);
    try {
      const res = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotId }),
      });

      if (res.status === 401) {
        setFavorited(!next);
        router.push('/login');
        return;
      }

      if (!res.ok) {
        setFavorited(!next); // revert on error
      }
    } catch {
      setFavorited(!next); // revert on network error
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`${className ?? 'absolute bottom-3 right-3'} p-1.5 rounded-full transition-all ${
        favorited
          ? 'bg-red-500 text-white shadow-md'
          : 'bg-white/80 text-stone-400 hover:text-red-500 hover:bg-white shadow'
      }`}
    >
      <Heart size={14} className={favorited ? 'fill-current' : ''} />
    </button>
  );
}
