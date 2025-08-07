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
  devices: string;
  spatial?: string;
  popular?: boolean;
  headerColor: string;
}

export default function PlanSelectionPage() {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const plans: Plan[] = [
    {
      id: 'mobile',
      name: 'Mobile',
      price: '₹149',
      quality: 'Fair',
      resolution: '480p',
      screens: '1',
      downloads: '1',
      devices: 'Mobile phone, tablet',
      headerColor: 'bg-blue-600'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '₹199',
      quality: 'Good',
      resolution: '720p (HD)',
      screens: '1',
      downloads: '1',
      devices: 'TV, computer, mobile phone, tablet',
      popular: true,
      headerColor: 'bg-purple-600'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹499',
      quality: 'Great',
      resolution: '1080p (Full HD)',
      screens: '2',
      downloads: '2',
      devices: 'TV, computer, mobile phone, tablet',
      headerColor: 'bg-purple-700'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹649',
      quality: 'Best',
      resolution: '4K (Ultra HD) + HDR',
      screens: '4',
      downloads: '6',
      devices: 'TV, computer, mobile phone, tablet',
      spatial: 'Spatial audio (immersive sound) included',
      headerColor: 'bg-gradient-to-r from-purple-600 to-red-600'
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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 md:px-16 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <img 
              src="/images/netflix-logo.png" 
              alt="Netflix" 
              className="h-12 md:h-16 w-auto hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="/auth/login" className="text-black hover:underline font-medium">
            Sign Out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">STEP 2 OF 3</div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-red-600 h-1 rounded-full progress-66"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">Choose the plan that's right for you</h1>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div 
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedPlan === plan.id ? 'border-purple-600' : 'border-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Plan Header */}
                <div className={`${plan.headerColor} text-white p-4 text-center relative`}>
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-sm opacity-90">{plan.resolution}</p>
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Plan Details */}
                <div className="p-4 bg-white">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Monthly price</div>
                    <div className="font-bold text-lg">{plan.price}</div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Video and sound quality</div>
                      <div className="font-semibold">{plan.quality}</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">Resolution</div>
                      <div className="font-semibold">{plan.resolution}</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">Supported devices</div>
                      <div className="font-semibold">{plan.devices}</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">Devices your household can watch at the same time</div>
                      <div className="font-semibold">{plan.screens}</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">Download devices</div>
                      <div className="font-semibold">{plan.downloads}</div>
                    </div>

                    {plan.spatial && (
                      <div>
                        <div className="text-gray-600 mb-1">Spatial audio (immersive sound)</div>
                        <div className="font-semibold">Included</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-600 mb-8 max-w-4xl mx-auto">
          <p className="mb-2">
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> for more details.
          </p>
          <p className="mb-2">
            Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
          </p>
          <p>
            Live events are included with any Netflix plan and contain ads.
          </p>
        </div>

        {/* Next Button */}
        <div className="text-center">
          <button
            onClick={handleNext}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-16 rounded text-xl transition duration-300"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}