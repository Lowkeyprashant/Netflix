// src/app/auth/signup/payment/upi/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpiPaymentPage() {
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

  const handleUpiSubmit = () => {
    setLoading(true);
    // Simulate UPI redirect and payment process
    setTimeout(() => {
      localStorage.removeItem('signupEmail');
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('signupPassword');
      localStorage.removeItem('paymentMethod');
      router.push('/auth/signup/success');
    }, 3000);
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
          Complete payment with UPI
        </h1>

        {/* UPI Logos */}
        <div className="flex justify-center space-x-4 mb-8 flex-wrap">
          <img src="/images/BHIM.png" alt="BHIM" className="h-8" />
          <img src="/images/Paytm.png" alt="PayTM" className="h-8" />
          <img src="/images/phonepe.png" alt="PhonePe" className="h-8" />
          <img src="/images/amazon-pay.png" alt="Amazon Pay" className="h-8" />
          <img src="/images/google-pay.png" alt="Google Pay" className="h-8" />
        </div>

        {/* Plan Summary */}
        <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-6">
          <div>
            <div className="font-semibold">{planPrice}/month</div>
            <div className="text-sm text-gray-600">{plans[selectedPlan]?.name}</div>
            <div className="text-sm text-gray-600">{email}</div>
          </div>
          <Link href="/auth/signup/plan" className="text-blue-600 hover:underline text-sm font-medium">
            Change
          </Link>
        </div>

        {/* UPI Information */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            You will be redirected to your UPI app to complete the payment and set up AutoPay for future billing.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-blue-800">UPI AutoPay</span>
            </div>
            <p className="text-sm text-blue-700">
              AutoPay will be set up for automatic monthly payments. You can manage or cancel this anytime from your account settings.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpiSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirecting to UPI...' : 'Continue with UPI'}
        </button>

        {/* Back to Payment Methods */}
        <div className="text-center mt-6">
          <Link href="/auth/signup/payment" className="text-blue-600 hover:underline text-sm">
            ← Back to payment methods
          </Link>
        </div>

        {/* Terms */}
        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>
            By proceeding, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            Netflix will automatically continue your membership and charge the membership fee to your UPI account until you cancel.
          </p>
        </div>
      </main>
    </div>
  );
}