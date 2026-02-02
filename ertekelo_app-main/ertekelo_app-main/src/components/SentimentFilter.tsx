import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { ReviewConfig } from '../config';

interface SentimentFilterProps {
  config: ReviewConfig;
  onRatingSelect: (rating: number) => void;
}

export function SentimentFilter({ config, onRatingSelect }: SentimentFilterProps) {
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    onRatingSelect(rating);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center animate-fadeIn">
      <div className="mb-8">
        <img
          src={config.logoUrl}
          alt={config.companyName}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover mb-6 ring-4 ring-blue-100 shadow-lg"
        />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {config.companyName}
        </h2>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
        Hogy voltál megelégedve a szolgáltatással?
      </h1>

      <p className="text-gray-600 mb-10 text-lg">
        Az Ön visszajelzése fontos számunkra
      </p>

      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="transform transition-all duration-200 hover:scale-120 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-2 active:scale-90"
          >
            <Star
              className="w-16 h-16 sm:w-20 sm:h-20 transition-all duration-200 cursor-pointer"
              style={{
                fill: star <= hoveredStar ? config.colors.primaryHex : 'none',
                color: star <= hoveredStar ? config.colors.primaryHex : '#D1D5DB',
                stroke: star <= hoveredStar ? 'none' : '2',
              }}
            />
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        Kattints a csillagokra az értékeléshez
      </p>
    </div>
  );
}
