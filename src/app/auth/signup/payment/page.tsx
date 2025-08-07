// src/app/auth/signup/payment/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentMethodPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [planPrice, setPlanPrice] = useState<string>('');
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

  const handlePaymentMethodSelect = (method: 'card' | 'upi') => {
    localStorage.setItem('paymentMethod', method);
    if (method === 'card') {
      router.push('/auth/signup/payment/card');
    } else {
      router.push('/auth/signup/payment/upi');
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

        {/* Security Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-6V9a6 6 0 1112 0v2m-6 6a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Choose how to pay</h1>
        
        <p className="text-center text-gray-600 mb-2">
          Your payment is encrypted and you can change your payment method at anytime.
        </p>
        
        <div className="text-center mb-6">
          <p className="font-semibold">Secure for peace of mind.</p>
          <p className="font-semibold">Cancel easily online.</p>
        </div>

        <div className="text-right text-sm text-gray-600 mb-4">
          End-to-end encrypted 🔒
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-8">
          {/* Credit/Debit Card */}
          <div 
            className="border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between border-gray-300 hover:border-red-300"
            onClick={() => handlePaymentMethodSelect('card')}
          >
            <div className="flex items-center">
              <span className="font-medium">Credit or Debit Card</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/images/visa.png" alt="Visa" className="h-5" />
              <img src="/images/mastercard.png" alt="Mastercard" className="h-5" />
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* UPI AutoPay */}
          <div 
            className="border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between border-gray-300 hover:border-red-300"
            onClick={() => handlePaymentMethodSelect('upi')}
          >
            <div className="flex items-center">
              <span className="font-medium">UPI AutoPay</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/images/BHIM.png" alt="BHIM" className="h-5" />
              <img src="/images/Paytm.png" alt="PayTM" className="h-5" />
              <img src="/images/phonepe.png" alt="PhonePe" className="h-5" />
              <img src="/images/amazon-pay.png" alt="Amazon Pay" className="h-5" />
              <img src="/images/google-pay.png" alt="Google Pay" className="h-5" />
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}