'use client';

import { CheckCircle } from 'lucide-react';

export function SuccessScreen({
  companyName,
  isDemoMode = false,
  message,
}: {
  companyName: string;
  isDemoMode?: boolean;
  message?: string | null;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full animate-fadeIn">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Köszönjük!</h1>
        {isDemoMode ? (
          <>
            <p className="text-gray-600 leading-relaxed">Demo mód: az üzenet nem került elküldésre emailben.</p>
            {message ? (
              <pre className="mt-5 text-left text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-2xl p-4 whitespace-pre-wrap text-gray-800">
                {message}
              </pre>
            ) : null}
          </>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            Visszajelzésed értékes számunkra, és segít a fejlődésben. Ha megadtad az elérhetőséged, {companyName}{' '}
            hamarosan felkereshet.
          </p>
        )}
      </div>
    </div>
  );
}


