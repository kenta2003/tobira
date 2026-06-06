'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Copy, Check, ExternalLink } from 'lucide-react';

type SavedTrip = {
  id: string;
  title: string;
  overview: string | null;
  share_token: string;
  created_at: string;
};

export default function TripsClient({ trips: initial }: { trips: SavedTrip[] }) {
  const [trips, setTrips] = useState(initial);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/user/trips/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTrips((prev) => prev.filter((t) => t.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCopy(shareToken: string, id: string) {
    const url = `${window.location.origin}/trip/${shareToken}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-1">My Trips</h1>
        <p className="text-stone-500 text-sm">Your saved AI-generated itineraries</p>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <p className="text-lg font-medium mb-2">No saved trips yet</p>
          <p className="text-sm mb-6">Generate an itinerary in the AI Planner and save it here.</p>
          <Link
            href="/plan"
            className="inline-block bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Plan a Trip
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/trip/${trip.share_token}`}
                    className="font-semibold text-stone-900 hover:text-red-600 transition-colors flex items-center gap-1.5 group"
                  >
                    {trip.title}
                    <ExternalLink size={13} className="text-stone-400 group-hover:text-red-500 shrink-0" />
                  </Link>
                  {trip.overview && (
                    <p className="text-sm text-stone-500 mt-1 line-clamp-2">{trip.overview}</p>
                  )}
                  <p className="text-xs text-stone-400 mt-2">
                    {new Date(trip.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(trip.share_token, trip.id)}
                    title="Copy share link"
                    className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    {copiedId === trip.id ? (
                      <Check size={15} className="text-green-500" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    disabled={deletingId === trip.id}
                    title="Delete trip"
                    className="p-2 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
