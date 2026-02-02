import React, { useState } from 'react';
import { config } from './config';
import { SentimentFilter } from './components/SentimentFilter';
import { NegativeFlow } from './components/NegativeFlow';
import { PositiveFlow } from './components/PositiveFlow';
import { SuccessModal } from './components/SuccessModal';
import { MaintenanceScreen } from './components/MaintenanceScreen';

type AppState = 'initial' | 'negative' | 'positive' | 'success';

function App() {
  const [state, setState] = useState<AppState>('initial');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!config.isClientActive) {
    return <MaintenanceScreen companyName={config.companyName} logoUrl={config.logoUrl} />;
  }

  const handleRatingSelect = (rating: number) => {
    if (rating <= 3) {
      setState('negative');
    } else {
      setState('positive');
    }
  };

  const handleSubmitFeedback = (feedback: string) => {
    console.log('Feedback submitted:', feedback);
    setShowSuccess(true);
    setTimeout(() => {
      setState('initial');
      setShowSuccess(false);
    }, 3500);
  };

  const handleCopyAndRedirect = (reviewText: string) => {
    console.log('Review sent to Google:', reviewText);
    setState('initial');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>

      <div className="w-full max-w-md">
        {state === 'initial' && (
          <SentimentFilter config={config} onRatingSelect={handleRatingSelect} />
        )}

        {state === 'negative' && (
          <NegativeFlow config={config} onSubmit={handleSubmitFeedback} />
        )}

        {state === 'positive' && (
          <PositiveFlow config={config} onCopyAndRedirect={handleCopyAndRedirect} />
        )}
      </div>

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

export default App;
