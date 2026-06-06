type Props = {
  text: string;
};

export default function CharacterSection({ text }: Props) {
  const paragraphs = text.split('\n').filter(Boolean);

  return (
    <div className="border-l-2 border-red-200 pl-5 space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-stone-700 text-lg leading-relaxed text-justify hyphens-auto">
          {para}
        </p>
      ))}
    </div>
  );
}
