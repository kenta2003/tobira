'use client'

import { useState } from 'react'
import type { SlideData } from '@/types/instagram'

type Props = {
  slides: SlideData[]
  themeTitle: string
}

export default function CarouselPreview({ slides, themeTitle }: Props) {
  const [index, setIndex] = useState(0)

  if (slides.length === 0) return <p className="text-gray-400 text-sm">スライドなし</p>

  const slide = slides[index]

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xs text-gray-500 font-medium">{themeTitle}</div>

      <div className="relative aspect-square w-full max-w-xs bg-gray-100 rounded-xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slide.image_url}
          alt={slide.slide_caption}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
        {slide.slide_caption}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-40"
        >
          ←
        </button>
        <span className="text-xs text-gray-500">
          {index + 1} / {slides.length}
        </span>
        <button
          onClick={() => setIndex(i => Math.min(slides.length - 1, i + 1))}
          disabled={index === slides.length - 1}
          className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  )
}
