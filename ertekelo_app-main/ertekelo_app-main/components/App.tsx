'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReviewConfig } from '../config';
import { MaintenanceScreen } from './MaintenanceScreen';
import { SentimentFilter } from './SentimentFilter';
import { NegativeFlow, type NegativeSubmission } from './NegativeFlow';
import { PositiveFlow } from './PositiveFlow';
import { SuccessScreen } from './SuccessScreen';

type View = 'rating' | 'negative' | 'positive' | 'success';

function voteKey(clientSlug: string) {
  return `reviewApp:lastVoteDate:${clientSlug}`;
}

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function App({ config, clientSlug }: { config: ReviewConfig; clientSlug: string }) {
  const [view, setView] = useState<View>('rating');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [alreadyVotedToday, setAlreadyVotedToday] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  const isBlocked = useMemo(() => alreadyVotedToday, [alreadyVotedToday]);

  useEffect(() => {
    if (isDemoMode) {
      setAlreadyVotedToday(false);
      return;
    }
    try {
      const last = window.localStorage.getItem(voteKey(clientSlug));
      setAlreadyVotedToday(last === todayStamp());
    } catch {
      // ignore
    }
  }, [clientSlug, isDemoMode]);

  const markVotedToday = () => {
    if (isDemoMode) return;
    try {
      window.localStorage.setItem(voteKey(clientSlug), todayStamp());
      setAlreadyVotedToday(true);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (view !== 'success') return;
    const t = window.setTimeout(() => {
      setView('rating');
      setSelectedRating(null);
      setSubmitError(null);
      setSuccessMessage(null);
    }, 5000);
    return () => window.clearTimeout(t);
  }, [view]);

  if (!config.isClientActive) {
    return <MaintenanceScreen companyName={config.companyName} logoUrl={config.logoUrl} />;
  }

  const handleRatingSelect = (rating: number) => {
    setSubmitError(null);
    setSuccessMessage(null);

    setSelectedRating(rating);
    setView(rating <= 3 ? 'negative' : 'positive');
  };

  const handleBackToRating = () => {
    setView('rating');
    setSelectedRating(null);
    setSubmitError(null);
    setSuccessMessage(null);
  };

  const handleSubmitNegative = async (submission: NegativeSubmission) => {
    setSubmitError(null);

    if (!selectedRating) {
      setSubmitError('Hiányzó értékelés. Kérjük, válassz csillagot.');
      return;
    }

    const payload = {
      clientSlug,
      companyName: config.companyName,
      rating: selectedRating,
      feedback: submission.feedback,
      name: submission.name || undefined,
      phone: submission.phone || undefined,
      email: submission.email || undefined,
    };

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      setSubmitError('Hiba történt a küldés során. Kérjük próbáld újra.');
      return;
    }

    if (data && typeof data.message === 'string' && data.message.trim().length > 0) {
      setSuccessMessage(data.message);
    } else {
      setSuccessMessage(null);
    }

    // Daily limit is consumed only after a successful send.
    markVotedToday();
    setView('success');
  };

  const handleCopyAndRedirect = () => {
    // Positive flow counts as a completed “vote” only after the user takes the action.
    markVotedToday();
    setView('rating');
    setSelectedRating(null);
    setSubmitError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
      `}</style>

      <div className="w-full max-w-md">
        {view === 'rating' && (
          <SentimentFilter
            config={config}
            disabled={isBlocked}
            disabledMessage="Ma már küldtél értékelést erről az eszközről. Kérjük, próbáld újra holnap."
            onRatingSelect={handleRatingSelect}
          />
        )}

        {view === 'negative' && (
          <NegativeFlow
            config={config}
            rating={selectedRating ?? 0}
            submitError={submitError}
            onBack={handleBackToRating}
            onSubmit={handleSubmitNegative}
          />
        )}

        {view === 'positive' && (
          <PositiveFlow config={config} onBack={handleBackToRating} onCopyAndRedirect={handleCopyAndRedirect} />
        )}

        {view === 'success' && <SuccessScreen companyName={config.companyName} isDemoMode={isDemoMode} message={successMessage} />}
      </div>
    </div>
  );
}


