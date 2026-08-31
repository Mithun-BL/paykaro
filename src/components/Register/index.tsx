'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
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

        {/* Right Column: Register Form (Col-Span 6) */}
        <div className="col-span-12 lg:col-span-6 bg-white p-8 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center mb-2">Create your account</h2>
            <p className="text-slate-500 text-sm text-center mb-8">
              Start accepting and tracking payments in minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2" htmlFor="fullName">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your name"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2" htmlFor="phone">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <Image
                      src={showPassword ? "/svg/eye-off.svg" : "/svg/eye.svg"}
                      alt="toggle password visibility"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Use at least 8 characters with a number and symbol.
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
                  I agree to PayKaro's{' '}
                  <Link href="/terms" className="text-blue-600 font-semibold hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm mt-2"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-8">
              Already have an account?{' '}
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
