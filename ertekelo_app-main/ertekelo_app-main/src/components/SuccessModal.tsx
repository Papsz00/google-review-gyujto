import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-sm w-full animate-slideUp">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Köszönjük!
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Visszajelzésed értékes számunkra, és segít a fejlődésben. A vezetőség hamarosan felkeresi ezzel az üzenettel.
          </p>
        </div>
      </div>
    </div>
  );
}
