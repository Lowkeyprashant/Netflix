// src/app/auth/signup/plan/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  price: string;
  quality: string;
  resolution: string;
  screens: string;
  downloads: string;
  ads: boolean;
  popular?: boolean;
}

export default function PlanSelectionPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const plans: Plan[] = [
    {
      id: 'mobile',
      name: 'Mobile',
      price: '₹149',
      quality: 'Good',
      resolution: '480p',
      screens: '1',
      downloads: '1',
      ads: false
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '₹199',
      quality: 'Good',
      resolution: '720p',
      screens: '1',
      downloads: '1',
      ads: false
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹499',
      quality: 'Better',
      resolution: '1080p',
      screens: '2',
      downloads: '2',
      ads: false,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹649',
      quality: 'Best',
      resolution: '4K+HDR',
      screens: '4',
      downloads: '6',
      ads: false
    }
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  const handleNext = () => {
    localStorage.setItem('selectedPlan', selectedPlan);
    router.push('/auth/signup/payment');
  };

  const selectedPlanDetails = plans.find(plan => plan.id === selectedPlan);

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
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">STEP 2 OF 3</div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-red-600 h-1 rounded-full" style={{ width: '66.67%' }}></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Choose your plan.</h1>

        {/* Value Propositions */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-lg">No commitments, cancel anytime.</span>
          </div>
          <div className="flex items-center mb-3">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-lg">Everything on Netflix for one low price.</span>
          </div>
          <div className="flex items-center mb-8">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-lg">Unlimited viewing on all your devices.</span>
          </div>
        </div>

        {/* Plan Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">{plan.price}</div>
                      <div className="text-sm text-gray-600">/month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Video quality:</span>
                      <span className="font-semibold">{plan.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution:</span>
                      <span className="font-semibold">{plan.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Screens you can watch on:</span>
                      <span className="font-semibold">{plan.screens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downloads:</span>
                      <span className="font-semibold">{plan.downloads}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="radio"
                      id={`mobile-${plan.id}`}
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="w-4 h-4 text-red-600"
                    />
                    <label htmlFor={`mobile-${plan.id}`} className="ml-2 text-sm font-medium">
                      Select {plan.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 w-1/5"></th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 w-1/5 relative">
                        <div
                          className={`border-2 rounded-t-lg p-4 cursor-pointer transition-all ${
                            selectedPlan === plan.id
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-300 bg-gray-50 hover:border-red-300'
                          }`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                Most Popular
                              </span>
                            </div>
                          )}
                          <div className="text-2xl font-bold">{plan.price}</div>
                          <div className="text-sm opacity-80">/month</div>
                        </div>
                        <input
                          type="radio"
                          id={plan.id}
                          name="plan"
                          value={plan.id}
                          checked={selectedPlan === plan.id}
                          onChange={() => setSelectedPlan(plan.id)}
                          className="mt-2 w-4 h-4 text-red-600"
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold text-gray-700">Monthly price</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center py-4 font-semibold">
                        {plan.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold text-gray-700">Video quality</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center py-4">
                        {plan.quality}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold text-gray-700">Resolution</td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center py-4">
                        {plan.resolution}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold text-gray-700">
                      Screens you can watch on at the same time
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center py-4">
                        {plan.screens}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold text-gray-700">
                      Download devices
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.id} className="text-center py-4">
                        {plan.downloads}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="mb-2">
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> for more details.
          </p>
          <p>
            Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
          </p>
        </div>

        {/* Next Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded text-xl transition duration-300"
          >
            Next
          </button>
        </div>

        {/* Selected Plan Summary */}
        {selectedPlanDetails && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4">Plan Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Selected Plan:</span>
                <span className="font-semibold ml-2">{selectedPlanDetails.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Price:</span>
                <span className="font-semibold ml-2">{selectedPlanDetails.price}</span>
              </div>
              <div>
                <span className="text-gray-600">Video Quality:</span>
                <span className="font-semibold ml-2">{selectedPlanDetails.quality}</span>
              </div>
              <div>
                <span className="text-gray-600">Screens:</span>
                <span className="font-semibold ml-2">{selectedPlanDetails.screens}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}