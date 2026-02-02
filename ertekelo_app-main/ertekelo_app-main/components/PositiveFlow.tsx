'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import type { ReviewConfig } from '../config';

interface PositiveFlowProps {
  config: ReviewConfig;
  onBack: () => void;
  onCopyAndRedirect: (reviewText: string) => void;
}

export function PositiveFlow({ config, onBack, onCopyAndRedirect }: PositiveFlowProps) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [reviewText, setReviewText] = useState('Nagyon elégedett vagyok!');
  const [hasUserEdited, setHasUserEdited] = useState(false);

  const handleTagClick = (label: string) => {
    // Click order is preserved; removing a tag keeps the relative order of the rest.
    setSelectedLabels((prev) => (prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]));
  };

  const generatedReviewText = useMemo(() => {
    const intro = 'Nagyon elégedett vagyok!';
    if (selectedLabels.length === 0) return intro;

    const byLabel = new Map(config.reviewTags.map((t) => [t.label, t.text] as const));
    const sentences = selectedLabels
      .map((label) => byLabel.get(label))
      .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
      .map((t) => t.trim().replace(/\s+$/g, ''));

    return [intro, ...sentences].join(' ');
  }, [config.reviewTags, selectedLabels]);

  // Whenever tags change and the user has not manually edited the text yet,
  // keep the editable textarea in sync with the smart suggestion.
  useEffect(() => {
    if (!hasUserEdited) {
      setReviewText(generatedReviewText);
    }
  }, [generatedReviewText, hasUserEdited]);

  const handleCopyAndRedirect = async () => {
    try {
      await navigator.clipboard.writeText(reviewText);
      setShowCopiedToast(true);
      setTimeout(() => {
        setShowCopiedToast(false);
        window.open(config.googleReviewUrl, '_blank');
      }, 1500);
    } catch {
      window.open(config.googleReviewUrl, '_blank');
    }
    onCopyAndRedirect(reviewText);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl px-6 py-8 sm:px-10 sm:py-12 animate-fadeIn relative">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-5 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Vissza"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="text-center mb-6 sm:mb-8 pt-2">
        <img
          src={config.logoUrl}
          alt={config.companyName}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-6 ring-4 ring-green-100"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-3">Örülünk, hogy tetszett!</h1>
        <p className="text-gray-600 text-base sm:text-lg">Segíts másoknak is ránk találni egy gyors értékeléssel.</p>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-700 mb-4">Válaszd ki, mi tetszett a legjobban:</p>

        <div className="flex flex-wrap gap-3 justify-center">
          {config.reviewTags.map((tag) => {
            const selected = selectedLabels.includes(tag.label);
            return (
              <button
                key={tag.label}
                onClick={() => handleTagClick(tag.label)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-10 ${
                  selected ? 'text-white shadow-lg ring-2 ring-offset-2' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  selected
                    ? {
                        backgroundColor: config.colors.primaryHex,
                        boxShadow: `0 10px 25px -5px ${config.colors.primaryHex}40`,
                        // ring color via boxShadow since Tailwind ring colors can’t be dynamic at build time
                        outline: `2px solid ${config.colors.primaryHex}`,
                        outlineOffset: '2px',
                      }
                    : undefined
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-4 sm:p-6 mb-8 text-left">
        <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Előnézet (szabadon szerkeszthető):</p>
        <textarea
          value={reviewText}
          onChange={(e) => {
            const next = e.target.value;
            setReviewText(next);
            setHasUserEdited(next.trim().length > 0);
          }}
          className="w-full min-h-[96px] sm:min-h-[120px] bg-transparent border border-blue-200 rounded-xl px-3 py-2 text-sm sm:text-base text-gray-900 leading-relaxed outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-vertical"
        />
      </div>

      <button
        onClick={handleCopyAndRedirect}
        className="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 min-h-14 text-base sm:text-lg"
        style={{ backgroundColor: config.colors.primaryHex }}
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


