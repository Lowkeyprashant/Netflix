// src/app/error.tsx

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
        <p className="text-gray-400 mb-8">
          We're sorry, but something unexpected happened.
        </p>
        <button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition duration-300 mr-4"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded font-bold transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}