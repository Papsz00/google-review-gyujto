import React, { useState } from 'react';
import { Send, ExternalLink } from 'lucide-react';
import { ReviewConfig } from '../config';

interface NegativeFlowProps {
  config: ReviewConfig;
  onSubmit: (feedback: string) => void;
}

export function NegativeFlow({ config, onSubmit }: NegativeFlowProps) {
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (feedback.trim()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onSubmit(feedback);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 animate-fadeIn">
      <div className="text-center mb-8">
        <img
          src={config.logoUrl}
          alt={config.companyName}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-6 ring-4 ring-orange-100"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Sajnáljuk a kellemetlenséget!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Kérlek, írd meg nekünk közvetlenül, miben fejlődhetünk. Üzenetedet a vezetőség azonnal megkapja.
        </p>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Írd le, mi nem tetszett..."
        maxLength={500}
        className="w-full h-44 sm:h-48 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none mb-4 text-base"
      />

      <p className="text-xs text-gray-500 mb-6">
        {feedback.length} / 500 karakter
      </p>

      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || isSubmitting}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-h-14"
      >
        <Send className="w-5 h-5" />
        <span>Vélemény elküldése a Vezetőségnek</span>
      </button>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <a
          href={config.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 underline flex items-center justify-center gap-1 transition-colors"
        >
          Vagy nyilvános értékelés írása a Google-ön
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
