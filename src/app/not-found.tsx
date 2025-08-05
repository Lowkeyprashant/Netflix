// src/app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition duration-300">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}