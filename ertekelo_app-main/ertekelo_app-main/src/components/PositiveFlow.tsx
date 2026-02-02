import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { ReviewConfig } from '../config';

interface PositiveFlowProps {
  config: ReviewConfig;
  onCopyAndRedirect: (reviewText: string) => void;
}

export function PositiveFlow({ config, onCopyAndRedirect }: PositiveFlowProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const generateReviewText = () => {
    const baseText = "Nagyon elégedett vagyok!";
    if (selectedTags.length === 0) return baseText;
    return `${baseText} ${selectedTags.join(', ')}.`;
  };

  const handleCopyAndRedirect = async () => {
    const reviewText = generateReviewText();
    try {
      await navigator.clipboard.writeText(reviewText);
      setShowCopiedToast(true);
      setTimeout(() => {
        setShowCopiedToast(false);
        window.open(config.googleReviewUrl, '_blank');
      }, 1500);
    } catch (err) {
      window.open(config.googleReviewUrl, '_blank');
    }
    onCopyAndRedirect(reviewText);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 animate-fadeIn">
      <div className="text-center mb-8">
        <img
          src={config.logoUrl}
          alt={config.companyName}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-6 ring-4 ring-green-100"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-3">
          Örülünk, hogy tetszett!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Segíts másoknak is ránk találni egy gyors értékeléssel.
        </p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-4">
          Válaszd ki, mi tetszett a legjobban:
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {config.reviewTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-10 ${
                selectedTags.includes(tag)
                  ? `bg-${config.colors.primary} text-white shadow-lg ring-2 ring-offset-2 ring-${config.colors.primary}`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={
                selectedTags.includes(tag)
                  ? {
                      backgroundColor: config.colors.primaryHex,
                      boxShadow: `0 10px 25px -5px ${config.colors.primaryHex}40`,
                    }
                  : {}
              }
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8">
        <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
          Előnézet:
        </p>
        <p className="text-lg sm:text-xl font-medium text-gray-900 leading-relaxed">
          {generateReviewText()}
        </p>
      </div>

      <button
        onClick={handleCopyAndRedirect}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 min-h-14 text-base sm:text-lg"
      >
        <Copy className="w-5 h-5" />
        <span>Szöveg másolása és Tovább a Google-re</span>
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        A szöveg a vágólapra kerül, majd átirányítunk a Google értékelésekhez
      </p>

      {showCopiedToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Szöveg másolva a vágólapra!</span>
        </div>
      )}
    </div>
  );
}
