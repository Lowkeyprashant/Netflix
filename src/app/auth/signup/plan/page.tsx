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
      headerColor: 'bg-gradient-to-br from-blue-500 to-blue-700'
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
      headerColor: 'bg-gradient-to-br from-purple-500 to-purple-700'
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
      headerColor: 'bg-gradient-to-br from-purple-600 to-indigo-700'
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
      headerColor: 'bg-gradient-to-br from-red-500 via-purple-600 to-indigo-700'
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
      <header className="border-b border-gray-200 px-6 md:px-16 py-6">
        <div className="flex justify-between items-center">
          <Link href="/">
            <img 
              src="/images/netflix-logo.png" 
              alt="Netflix" 
              className="h-10 w-auto md:h-14 hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="/auth/login" className="text-black hover:underline font-medium text-lg">
            Sign Out
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="text-sm text-gray-600 mb-3 font-medium">STEP 2 OF 3</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-600 h-2 rounded-full w-2/3 transition-all duration-500"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gray-900">
          Choose the plan that's right for you
        </h1>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div 
                className={`border-4 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  selectedPlan === plan.id 
                    ? 'border-purple-600 shadow-2xl ring-4 ring-purple-200' 
                    : 'border-gray-300 shadow-lg hover:border-gray-400'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Plan Header */}
                <div className={`${plan.headerColor} text-white p-6 text-center relative`}>
                  <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                  <p className="text-sm opacity-90 font-medium">{plan.resolution}</p>
                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-20 rounded-full p-1">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Plan Details */}
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2 font-medium">Monthly price</div>
                    <div className="font-bold text-2xl text-gray-900">{plan.price}</div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="border-b border-gray-100 pb-3">
                      <div className="text-gray-500 mb-1 font-medium">Video and sound quality</div>
                      <div className="font-semibold text-gray-900">{plan.quality}</div>
                    </div>

                    <div className="border-b border-gray-100 pb-3">
                      <div className="text-gray-500 mb-1 font-medium">Resolution</div>
                      <div className="font-semibold text-gray-900">{plan.resolution}</div>
                    </div>

                    <div className="border-b border-gray-100 pb-3">
                      <div className="text-gray-500 mb-1 font-medium">Supported devices</div>
                      <div className="font-semibold text-gray-900 leading-relaxed">{plan.devices}</div>
                    </div>

                    <div className="border-b border-gray-100 pb-3">
                      <div className="text-gray-500 mb-1 font-medium">Devices your household can watch at the same time</div>
                      <div className="font-semibold text-gray-900">{plan.screens}</div>
                    </div>

                    <div className="border-b border-gray-100 pb-3">
                      <div className="text-gray-500 mb-1 font-medium">Download devices</div>
                      <div className="font-semibold text-gray-900">{plan.downloads}</div>
                    </div>

                    {plan.spatial && (
                      <div>
                        <div className="text-gray-500 mb-1 font-medium">Spatial audio (immersive sound)</div>
                        <div className="font-semibold text-green-600">Included</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
          <p className="mb-4">
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Use</a> for more details.
          </p>
          <p className="mb-4">
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
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-20 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}