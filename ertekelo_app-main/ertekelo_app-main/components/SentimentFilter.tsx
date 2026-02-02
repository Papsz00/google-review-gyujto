'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import type { ReviewConfig } from '../config';

interface SentimentFilterProps {
  config: ReviewConfig;
  onRatingSelect: (rating: number) => void;
  disabled?: boolean;
  disabledMessage?: string;
}

export function SentimentFilter({
  config,
  onRatingSelect,
  disabled = false,
  disabledMessage,
}: SentimentFilterProps) {
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const ratingQuestion = config.texts?.ratingQuestion || 'Hogy voltál megelégedve a szolgáltatással?';

  const handleStarClick = (rating: number) => {
    if (disabled) return;
    onRatingSelect(rating);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl px-6 py-8 sm:px-10 sm:py-12 text-center animate-fadeIn">
      <div className="mb-6 sm:mb-8">
        <img
          src={config.logoUrl}
          alt={config.companyName}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover mb-6 ring-4 ring-blue-100 shadow-lg"
        />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{config.companyName}</h2>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {ratingQuestion}
      </h1>

      <p className="text-gray-600 mb-8 sm:mb-10 text-base sm:text-lg">Az Ön visszajelzése fontos számunkra</p>

      <div className="flex justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            disabled={disabled}
            aria-disabled={disabled}
            className="transform transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-1 sm:p-1.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-all duration-150 cursor-pointer"
              style={{
                // Always show a gold outline (border). Fill only on hover.
                fill: star <= hoveredStar && !disabled ? config.colors.starGoldHex : 'none',
                color: disabled ? '#D1D5DB' : config.colors.starGoldHex,
                strokeWidth: 2,
              }}
            />
          </button>
        ))}
      </div>

      {disabled && disabledMessage ? (
        <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          {disabledMessage}
        </p>
      ) : (
        <p className="text-sm text-gray-500">Kattints a csillagokra az értékeléshez</p>
      )}
    </div>
  );
}


