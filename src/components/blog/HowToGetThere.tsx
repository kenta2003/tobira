import { Train } from 'lucide-react';

type Props = {
  text: string;
};

export default function HowToGetThere({ text }: Props) {
  const paragraphs = text.split('\n').filter(Boolean);

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Train size={16} className="text-stone-500" />
        <h2 className="text-base font-semibold text-stone-900">How to Get There</h2>
      </div>
      <div className="space-y-2">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-stone-600 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
