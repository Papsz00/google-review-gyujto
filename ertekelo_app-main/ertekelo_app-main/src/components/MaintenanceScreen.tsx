import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MaintenanceScreenProps {
  companyName: string;
  logoUrl: string;
}

export function MaintenanceScreen({ companyName, logoUrl }: MaintenanceScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <img
          src={logoUrl}
          alt={companyName}
          className="w-24 h-24 mx-auto rounded-full object-cover mb-6 ring-4 ring-yellow-500 opacity-60"
        />

        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-yellow-500" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Karbantartás alatt
        </h1>

        <p className="text-xl text-gray-300 mb-2">
          Az értékelési rendszer jelenleg nem elérhető.
        </p>

        <p className="text-gray-400">
          Kérjük, próbálja később.
        </p>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            {companyName}
          </p>
        </div>
      </div>
    </div>
  );
}
