// src/app/auth/signup/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Background slideshow images - using your custom images
  const backgroundSlides = [
    '/images/netflix-background.jpg',
    '/images/netflix-background.jpg',
    '/images/netflix-background.jpg'
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('signupEmail', email);
      router.push('/auth/signup/password');
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price."
    },
    {
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app."
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space."
    }
  ];

  // Auto-slide background images
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-16 py-5 flex justify-between items-center">
        <Link href="/" className="focus:outline-none">
          {/* Bigger Netflix Logo */}
          <img 
            src="/images/netflix-logo.png" 
            alt="Netflix" 
            className="md:h-60 md:h- w-auto hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="flex items-center gap-5">
          <select 
            className="bg-black/40 border border-gray-400 text-white px-3 py-2 rounded text-sm"
            aria-label="Select language"
          >
            <option>🌐 English</option>
            <option>🌐 हिन्दी</option>
          </select>
          <Link href="/auth/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {backgroundSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Netflix Background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-lg md:text-2xl mb-4 font-medium">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 text-base bg-black/70 border border-gray-500 rounded text-white placeholder-transparent peer focus:border-white focus:bg-black/90 outline-none transition-all duration-300"
                placeholder="Email address"
                required
              />
              <label className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-white peer-valid:top-1 peer-valid:text-xs peer-valid:text-white">
                Email address
              </label>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg md:text-xl font-semibold rounded flex items-center justify-center gap-2 transition duration-300 whitespace-nowrap"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      {/* Section 1: Enjoy on your TV */}
      <section className="py-16 md:py-24 border-t-8 border-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Enjoy on your TV</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                alt="TV"
                className="relative z-10 w-full"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/5 z-0">
                <video autoPlay muted loop className="w-full h-full object-cover">
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Download your shows */}
      <section className="py-16 md:py-24 border-t-8 border-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative md:order-2">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="Mobile Download"
                className="w-full rounded-2xl"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black border-2 border-gray-500 rounded-xl px-4 py-3 flex items-center gap-4 min-w-72">
                <img
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                  alt="Stranger Things"
                  className="h-16 w-12 rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold">Stranger Things</div>
                  <div className="text-blue-500 text-sm">Downloading...</div>
                </div>
                <div className="w-8 h-8">
                  <div className="animate-bounce">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Download your shows to watch offline
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Save your favourites easily and always have something to watch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Watch everywhere */}
      <section className="py-16 md:py-24 border-t-8 border-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Watch everywhere</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                alt="Devices"
                className="relative z-10 w-full"
              />
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1/2 h-3/5 z-0">
                <video autoPlay muted loop className="w-full h-full object-cover">
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Kids profiles */}
      <section className="py-16 md:py-24 border-t-8 border-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative md:order-2">
              <img
                src="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d"
                alt="Kids Profile"
                className="w-full"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Create profiles for kids</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Send kids on adventures with their favourite characters in a space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-t-8 border-gray-800">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white p-6 text-left text-lg md:text-xl flex justify-between items-center transition-colors duration-300"
                >
                  <span className="font-medium">{faq.question}</span>
                  <svg 
                    className={`w-8 h-8 transform transition-transform duration-200 ${
                      activeFaq === index ? 'rotate-45' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? 'max-h-96 bg-gray-800' : 'max-h-0'
                }`}>
                  <div className="p-6 pt-0">
                    <p className="text-gray-300 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-base md:text-xl mb-8">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 text-base bg-black/70 border border-gray-500 rounded text-white placeholder-transparent peer focus:border-white focus:bg-black/90 outline-none transition-all duration-300"
                  placeholder="Email address"
                  required
                />
                <label className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-white peer-valid:top-1 peer-valid:text-xs peer-valid:text-white">
                  Email address
                </label>
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg md:text-xl font-semibold rounded flex items-center justify-center gap-2 transition duration-300 whitespace-nowrap"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-16 bg-black text-gray-400 border-t-8 border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8">Questions? Call 000-800-919-1743</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline">FAQ</a>
              <a href="#" className="block hover:text-white underline">Investor Relations</a>
              <a href="#" className="block hover:text-white underline">Privacy</a>
              <a href="#" className="block hover:text-white underline">Speed Test</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline">Help Centre</a>
              <a href="#" className="block hover:text-white underline">Jobs</a>
              <a href="#" className="block hover:text-white underline">Cookie Preferences</a>
              <a href="#" className="block hover:text-white underline">Legal Notices</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline">Account</a>
              <a href="#" className="block hover:text-white underline">Ways to Watch</a>
              <a href="#" className="block hover:text-white underline">Corporate Information</a>
              <a href="#" className="block hover:text-white underline">Only on Netflix</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline">Media Centre</a>
              <a href="#" className="block hover:text-white underline">Terms of Use</a>
              <a href="#" className="block hover:text-white underline">Contact Us</a>
            </div>
          </div>
          <select 
            className="bg-black/40 border border-gray-400 text-white px-3 py-2 rounded mb-5"
            aria-label="Select language"
          >
            <option>🌐 English</option>
            <option>🌐 हिन्दी</option>
          </select>
          <p>Netflix India</p>
        </div>
      </footer>
    </div>
  );
}