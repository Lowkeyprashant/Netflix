// src/app/auth/signup/payment/card/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
  agreeToTerms: boolean;
}

export default function CardDetailsPage() {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    agreeToTerms: false
  });
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [planPrice, setPlanPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const plans: Record<string, { name: string; price: string }> = {
    mobile: { name: 'Mobile', price: '₹149' },
    basic: { name: 'Basic', price: '₹199' },
    standard: { name: 'Standard', price: '₹499' },
    premium: { name: 'Premium', price: '₹649' }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail');
    const storedPlan = localStorage.getItem('selectedPlan') || 'basic';
    
    if (storedEmail) {
      setEmail(storedEmail);
      setSelectedPlan(storedPlan);
      const plan = plans[storedPlan];
      setPlanPrice(plan?.price || '₹199');
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length <= 5) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'cvv') {
      if (value.length <= 4) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      alert('Please agree to the Terms of Use and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        localStorage.removeItem('signupEmail');
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('signupPassword');
        localStorage.removeItem('paymentMethod');
        router.push('/auth/signup/success');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 md:px-16 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <img 
              src="/images/netflix-logo.png" 
              alt="Netflix" 
              className="h-8 md:h-10 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="/auth/login" className="text-black hover:underline font-medium">
            Sign Out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">STEP 3 OF 3</div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-red-600 h-1 rounded-full progress-100"></div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Set up your credit or debit card
        </h1>

        {/* Card Logos */}
        <div className="flex justify-center space-x-4 mb-8">
          <img src="/images/visa.png" alt="Visa" className="h-6" />
          <img src="/images/mastercard.png" alt="Mastercard" className="h-6" />
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div className="relative">
            <label htmlFor="cardNumber" className="sr-only">Card number</label>
            <input
              id="cardNumber"
              type="text"
              name="cardNumber"
              placeholder="Card number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg input-focus-fix"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2" aria-hidden="true">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="sr-only">Expiration date</label>
              <input
                id="expiryDate"
                type="text"
                name="expiryDate"
                placeholder="Expiration date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg input-focus-fix"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="cvv" className="sr-only">CVV security code</label>
              <input
                id="cvv"
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg input-focus-fix"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2" aria-hidden="true">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Name on Card */}
          <div>
            <label htmlFor="nameOnCard" className="sr-only">Name on card</label>
            <input
              id="nameOnCard"
              type="text"
              name="nameOnCard"
              placeholder="Name on card"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-lg input-focus-fix"
              required
            />
          </div>

          {/* Plan Summary */}
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold">{planPrice}/month</div>
              <div className="text-sm text-gray-600">{plans[selectedPlan]?.name}</div>
            </div>
            <Link href="/auth/signup/plan" className="text-blue-600 hover:underline text-sm font-medium">
              Change
            </Link>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-600 mb-4">
            <p className="mb-2">
              Any payment above ₹ 2000 will need additional authentication.
            </p>
          </div>

          {/* Terms Agreement */}
          <div className="text-sm text-gray-600 mb-6">
            <p>
              By ticking the box below, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Statement</a>{' '}
              and confirm that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently {planPrice}/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.
            </p>
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mt-1 mr-3"
              required
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree...
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Start Membership'}
          </button>
        </form>

        {/* reCAPTCHA Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
          </p>
        </div>
      </main>
    </div>
  );
}