import { Train, Calendar, Tag } from 'lucide-react';
import type { QuickFacts as QuickFactsType } from '@/lib/articles';

type Props = {
  facts: QuickFactsType;
};

export default function QuickFacts({ facts }: Props) {
  if (!facts.access && !facts.best_season && !facts.vibe_tags?.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {facts.access && (
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2.5 w-full">
          <Train size={14} className="text-stone-400 shrink-0" />
          <span className="text-sm text-stone-700">{facts.access}</span>
        </div>
      )}
      {facts.best_season && (
        <div className="flex items-start gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2.5 w-full">
          <Calendar size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <span className="text-sm text-stone-700">{facts.best_season}</span>
        </div>
      )}
      {facts.vibe_tags && facts.vibe_tags.length > 0 && (
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2.5 w-full">
          <Tag size={14} className="text-stone-400 shrink-0" />
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {facts.vibe_tags.map((tag) => (
              <span key={tag} className="text-xs text-stone-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
