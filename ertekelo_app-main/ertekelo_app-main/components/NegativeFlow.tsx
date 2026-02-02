'use client';

import { useState } from 'react';
import { ArrowLeft, ExternalLink, Send } from 'lucide-react';
import type { ReviewConfig } from '../config';

export interface NegativeSubmission {
  feedback: string;
  name: string;
  phone: string;
  email: string;
}

interface NegativeFlowProps {
  config: ReviewConfig;
  rating: number;
  submitError?: string | null;
  onBack: () => void;
  onSubmit: (submission: NegativeSubmission) => Promise<void> | void;
}

export function NegativeFlow({ config, rating, submitError, onBack, onSubmit }: NegativeFlowProps) {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ feedback: feedback.trim(), name: name.trim(), phone: phone.trim(), email: email.trim() });
    } finally {
      setIsSubmitting(false);
    }
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
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full object-cover mb-6 ring-4 ring-orange-100"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Sajnáljuk a kellemetlenséget!</h1>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
          Kérlek, írd meg nekünk közvetlenül, miben fejlődhetünk. Ha szeretnéd, add meg az elérhetőséged, és a vezetőség
          kivizsgálja az esetet.
        </p>
        <p className="mt-4 text-sm text-gray-500">Értékelés: {rating} / 5</p>
      </div>

      <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="feedback">
        Üzenet (kötelező)
      </label>
      <textarea
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Írd le, mi nem tetszett..."
        maxLength={500}
        className="w-full h-40 sm:h-44 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none mb-2 text-base"
      />

      <p className="text-xs text-gray-500 mb-6">{feedback.length} / 500 karakter</p>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
            Név (opcionális)
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pl. Kiss Anna"
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phone">
            Telefonszám (opcionális)
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Pl. +36 30 123 4567"
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
            Email (opcionális)
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Pl. anna@email.hu"
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none text-base"
          />
        </div>
      </div>

      {submitError ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">{submitError}</p>
      ) : null}

      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || isSubmitting}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-h-14"
      >
        <Send className="w-5 h-5" />
        <span>{isSubmitting ? 'Küldés...' : 'Vélemény elküldése a Vezetőségnek'}</span>
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Adataidat bizalmasan kezeljük, és kizárólag a panasz kivizsgálásához használjuk.
      </p>

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


