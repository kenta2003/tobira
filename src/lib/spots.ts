import { cache } from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Spot } from '@/types';

// cache() deduplicates DB calls within a single server request
export const getAllSpots = cache(async (): Promise<Spot[]> => {
  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from('spots')
    .select('*')
    .eq('is_published', true)
    .order('name');
  if (error) throw new Error(error.message);
  return (data ?? []) as Spot[];
});

export const getSpotById = cache(async (id: string): Promise<Spot | undefined> => {
  const adminClient = createAdminClient();
  const { data } = await adminClient
    .from('spots')
    .select('*')
    .eq('id', id)
    .single();
  return data ? (data as Spot) : undefined;
});
