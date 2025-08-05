// src/app/auth/signup/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store email and redirect to password creation
      localStorage.setItem('signupEmail', email);
      router.push('/auth/signup/password');
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Streamifyy?",
      answer: "Streamifyy is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices."
    },
    {
      question: "How much does Streamifyy cost?",
      answer: "Watch Streamifyy on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
    },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Streamifyy account to watch instantly on the web at streamifyy.com from your personal computer or on any internet-connected device."
    },
    {
      question: "How do I cancel?",
      answer: "Streamifyy is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      question: "What can I watch on Streamifyy?",
      answer: "Streamifyy has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more. Watch as much as you want, anytime you want."
    },
    {
      question: "Is Streamifyy good for kids?",
      answer: "The Streamifyy experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 px-12 py-5 flex justify-between items-center">
        <Link href="/" className="text-4xl font-bold text-red-600 hover:text-red-500">
          STREAMIFYY
        </Link>
        <div className="flex items-center gap-5">
          <select className="bg-black/40 border border-gray-400 text-white px-3 py-2 rounded">
            <option>🌐 English</option>
            <option>🌐 हिन्दी</option>
          </select>
          <Link href="/auth/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition duration-300">
              Sign In
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-gradient-to-t from-black/80 to-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="grid grid-cols-5 gap-2 h-full p-8">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 max-w-2xl px-5">
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-2xl mb-4">Starts at ₹149. Cancel at any time.</p>
          <p className="text-xl mb-8">Ready to watch? Enter your email to create or restart your membership.</p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-4 py-4 text-lg bg-black/70 border border-gray-500 rounded text-white placeholder-gray-400 focus:border-white focus:bg-black/90 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-lg font-semibold rounded flex items-center justify-center gap-2 transition duration-300"
            >
              Get Started <span>→</span>
            </button>
          </form>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 px-12 bg-black">
        <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
        <div className="flex gap-2 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="relative flex-shrink-0 w-60 h-36 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="absolute -bottom-5 -left-5 text-8xl font-black text-black z-10" style={{ WebkitTextStroke: '2px #aaa' }}>
                {num}
              </div>
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold">
                Movie {num}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-12 bg-black">
        <h2 className="text-3xl font-bold mb-8 text-center">More reasons to join</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[
            { icon: "📺", title: "Enjoy on your TV", desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more." },
            { icon: "⬇️", title: "Download your shows to watch offline", desc: "Save your favourites easily and always have something to watch." },
            { icon: "🌐", title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV." },
            { icon: "👨‍👩‍👧‍👦", title: "Create profiles for kids", desc: "Send kids on adventures with their favourite characters in a space made just for them—free with your membership." }
          ].map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-2xl text-center">
              <div className="w-18 h-18 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-12 bg-black">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto mb-12">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-2 bg-gray-800">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white p-6 text-left text-xl flex justify-between items-center transition-colors duration-300"
              >
                {faq.question}
                <span className="text-3xl">{activeFaq === index ? '×' : '+'}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96 p-6' : 'max-h-0'}`}>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-lg mx-auto">
          <p className="text-xl mb-5">Ready to watch? Enter your email to create or restart your membership.</p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-4 py-4 text-lg bg-black/70 border border-gray-500 rounded text-white placeholder-gray-400 focus:border-white focus:bg-black/90 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-lg font-semibold rounded flex items-center justify-center gap-2 transition duration-300"
            >
              Get Started <span>→</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-12 bg-black text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p className="mb-8">Questions? Call 000-800-919-1743</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline text-sm">FAQ</a>
              <a href="#" className="block hover:text-white underline text-sm">Investor Relations</a>
              <a href="#" className="block hover:text-white underline text-sm">Privacy</a>
              <a href="#" className="block hover:text-white underline text-sm">Speed Test</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline text-sm">Help Centre</a>
              <a href="#" className="block hover:text-white underline text-sm">Jobs</a>
              <a href="#" className="block hover:text-white underline text-sm">Cookie Preferences</a>
              <a href="#" className="block hover:text-white underline text-sm">Legal Notices</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline text-sm">Account</a>
              <a href="#" className="block hover:text-white underline text-sm">Ways to Watch</a>
              <a href="#" className="block hover:text-white underline text-sm">Corporate Information</a>
              <a href="#" className="block hover:text-white underline text-sm">Only on Streamifyy</a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block hover:text-white underline text-sm">Media Centre</a>
              <a href="#" className="block hover:text-white underline text-sm">Terms of Use</a>
              <a href="#" className="block hover:text-white underline text-sm">Contact Us</a>
            </div>
          </div>
          <select className="bg-black/40 border border-gray-400 text-white px-3 py-2 rounded mb-5">
            <option>🌐 English</option>
            <option>🌐 हिन्दी</option>
          </select>
          <p>Streamifyy India</p>
        </div>
      </footer>
    </div>
  );
}