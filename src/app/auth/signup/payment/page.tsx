// src/app/auth/signup/payment/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planPrice, setPlanPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const plans = {
    mobile: { name: 'Mobile', price: '₹149' },
    basic: { name: 'Basic', price: '₹199' },
    standard: { name: 'Standard', price: '₹499' },
    premium: { name: 'Premium', price: '₹649' }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail');
    const storedPlan = localStorage.getItem('selectedPlan') || 'premium';
    
    if (storedEmail) {
      setEmail(storedEmail);
      setSelectedPlan(storedPlan);
      setPlanPrice(plans[storedPlan as keyof typeof plans]?.price || '₹649');
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length <= 19) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'expiryDate') {
      // Format expiry date MM/YY
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length <= 5) {
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else if (name === 'cvv') {
      // Limit CVV to 4 digits
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
      // Create the user account
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: localStorage.getItem('signupPassword') || 'defaultPassword',
          plan: selectedPlan,
          paymentMethod: paymentMethod,
          paymentDetails: formData
        })
      });

      if (response.ok) {
        localStorage.removeItem('signupEmail');
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('signupPassword');
        
        // Redirect to onboarding
        router.push('/onboarding');
      } else {
        const data = await response.json();
        alert(data.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'card';
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 md:px-16 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <svg className="h-8 w-auto text-red-600" viewBox="0 0 111 30" fill="currentColor">
              <path d="M105.06 14.27L111 30c-1.75-.25-3.49-.58-5.24-.92l-3.79-8.92-3.79 8.92c-1.75.34-3.49.67-5.24.92l5.94-15.73L93.94 0h5.92l3.79 9.06L107.44 0h5.92l-8.3 14.27z"/>
              <path d="M90.97 0L85.06 0l-8.15 12.76L68.76 0l-5.91 0l8.15 12.76L62.85 30l5.91 0l8.15-12.76L85.06 30l5.91 0L82.82 17.24z"/>
              <path d="M42.64 0L37.73 0v18.43h15.67V14.27H42.64z"/>
              <path d="M21.4 18.25h13.94v4.18H21.4V30h-5.91V0h19.85v4.18H21.4z"/>
              <path d="M5.91 0v30H0V0z"/>
            </svg>
          </Link>
          <Link href="/auth/login" className="text-black hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">STEP 3 OF 3</div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-red-600 h-1 rounded-full w-full"></div>
          </div>
        </div>

        {/* Security Message */}
        <div className="flex items-center mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <svg className="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span className="text-sm text-yellow-800">
            Your payment is encrypted and you can change how you pay anytime.
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Choose how to pay</h1>

        {/* Payment Methods */}
        <div className="space-y-4 mb-8">
          {/* Credit/Debit Card */}
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            paymentMethod === 'card' ? 'border-red-600 bg-red-50' : 'border-gray-300'
          }`} onClick={() => setPaymentMethod('card')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <label htmlFor="card" className="font-semibold">Credit or Debit Card</label>
              </div>
              <div className="flex space-x-2">
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/svg/visa-v3.svg" alt="Visa" className="h-6" />
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/svg/mastercard-v2.svg" alt="Mastercard" className="h-6" />
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/svg/amex-v2.svg" alt="American Express" className="h-6" />
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            paymentMethod === 'paypal' ? 'border-red-600 bg-red-50' : 'border-gray-300'
          }`} onClick={() => setPaymentMethod('paypal')}>
            <div className="flex items-center">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="mr-3"
              />
              <label htmlFor="paypal" className="font-semibold">PayPal</label>
              <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/svg/paypal-v2.svg" alt="PayPal" className="h-6 ml-auto" />
            </div>
          </div>
        </div>

        {/* Payment Form */}
        {paymentMethod === 'card' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{plans[selectedPlan as keyof typeof plans]?.name} Plan</span>
                  <div className="text-sm text-gray-600">{email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{planPrice}/month</div>
                  <Link href="/auth/signup/plan" className="text-sm text-blue-600 hover:underline">
                    Change
                  </Link>
                </div>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 mr-3"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
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
        )}

        {/* PayPal Payment */}
        {paymentMethod === 'paypal' && (
          <div className="text-center">
            <p className="mb-6 text-gray-600">
              You will be redirected to PayPal to complete your payment.
            </p>
            
            {/* Plan Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{plans[selectedPlan as keyof typeof plans]?.name} Plan</span>
                  <div className="text-sm text-gray-600">{email}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{planPrice}/month</div>
                  <Link href="/auth/signup/plan" className="text-sm text-blue-600 hover:underline">
                    Change
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                // Simulate PayPal redirect
                setLoading(true);
                setTimeout(() => {
                  router.push('/onboarding');
                }, 2000);
              }}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-lg text-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Redirecting to PayPal...' : 'Continue with PayPal'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}