'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="min-h-screen w-full bg-white">
      <div className="grid grid-cols-12 min-h-screen w-full">
        {/* Left Column: Hero Section (Col-Span 6) with White Dot Grid Pattern */}
        <div className="col-span-12 lg:col-span-6 bg-[#2563EB] p-8 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
          {/* White Dot Grid Background Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.9) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10">
            {/* Brand Logo Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-inner">
                P
              </div>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">PayKaro</span>
            </div>

            {/* Main Content */}
            <div className="mt-12 lg:mt-20 max-w-lg">
              <h1 className="text-white text-3xl lg:text-4xl font-extrabold leading-tight mb-4 drop-shadow-sm">
                Payments that just work.
              </h1>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-8 font-medium drop-shadow-sm">
                Accept UPI, cards and net banking in one flow, track every rupee in real time, and give your customers a checkout they trust.
              </p>

              {/* Feature List */}
              <ul className="space-y-4 text-sm lg:text-base font-semibold">
                <li className="flex items-center gap-3 text-white drop-shadow-sm">
                  <Image src="/svg/check.svg" alt="check icon" width={20} height={20} className="shrink-0" />
                  <span>PCI-DSS compliant infrastructure</span>
                </li>
                <li className="flex items-center gap-3 text-white drop-shadow-sm">
                  <Image src="/svg/check.svg" alt="check icon" width={20} height={20} className="shrink-0" />
                  <span>256-bit end-to-end encryption</span>
                </li>
                <li className="flex items-center gap-3 text-white drop-shadow-sm">
                  <Image src="/svg/check.svg" alt="check icon" width={20} height={20} className="shrink-0" />
                  <span>Powered by Razorpay's payment network</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Powered By Badge */}
          <div className="mt-12 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 inline-flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-sm font-semibold text-white tracking-wide">Powered by PayKaro</span>
            </div>
          </div>
        </div>

        {/* Right Column: Forgot Password Form (Col-Span 6) */}
        <div className="col-span-12 lg:col-span-6 bg-white p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            {!submitted ? (
              <>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-2">Reset your password</h2>
                <p className="text-slate-500 text-sm text-center mb-8">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm mt-2"
                  >
                    Send reset link
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                <p className="text-slate-500 text-sm mb-6">
                  We've sent a password reset link to <span className="font-semibold text-slate-700">{email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Didn't receive email? Try again
                </button>
              </div>
            )}

            <p className="text-center text-sm text-slate-500 mt-8">
              Remember your password?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
