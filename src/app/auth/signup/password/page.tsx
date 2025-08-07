// src/app/auth/signup/password/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PasswordPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get email from localStorage (set in signup page)
    const storedEmail = localStorage.getItem('signupEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to signup
      router.push('/auth/signup');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Store password and proceed to plan selection
    localStorage.setItem('signupPassword', password);
    router.push('/auth/signup/plan');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-12 py-5 flex justify-between items-center border-b border-gray-800">
        <Link href="/" className="focus:outline-none">
          <img 
            src="/images/netflix-logo.png" 
            alt="Netflix" 
            className="h-8 md:h-10 w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link href="/auth/login">
          <button className="text-white hover:underline text-lg font-medium">
            Sign In
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[80vh] px-5">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <div className="w-12 h-1 bg-red-600 mb-6"></div>
            <p className="text-sm text-gray-400 mb-2">STEP 1 OF 3</p>
            <h1 className="text-3xl font-bold mb-4">Create a password to start your membership</h1>
            <p className="text-lg text-gray-300">
              Just a few more steps and you're done!<br />
              We hate paperwork, too.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-4 text-lg bg-gray-800 border border-gray-600 rounded text-gray-400 cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Add a password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Add a password"
                className="w-full px-4 py-4 text-lg bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-white focus:bg-gray-700 outline-none"
                required
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-4 text-lg bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-white focus:bg-gray-700 outline-none"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-xl font-bold rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Next'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}

          <div className="mt-8 text-sm text-gray-400">
            <p className="mb-4">
              By clicking "Next", you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}