'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StoreQR() {
  const [fixedAmount, setFixedAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const merchantName = "Mithun's PayKaro Store";
  const merchantVpa = "mithun.bl@paykaro";

  const handleCopy = () => {
    navigator.clipboard.writeText(`upi://pay?pa=${merchantVpa}&pn=${encodeURIComponent(merchantName)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
          Official Merchant Store QR Standee
        </span>
      </header>

      {/* Main Standee Card Preview */}
      <main className="max-w-md w-full mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-[#2563EB] text-white -mx-8 -mt-8 p-6 mb-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-extrabold text-2xl text-white shadow-inner mb-2">
            P
          </div>
          <h1 className="text-2xl font-black tracking-tight">PayKaro</h1>
          <p className="text-xs text-blue-100 font-medium">Accepted Here via BHIM UPI & All Cards</p>
        </div>

        {/* Merchant Info */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-slate-900">{merchantName}</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">UPI ID: {merchantVpa}</p>
        </div>

        {/* Dynamic High-Quality QR Code Box */}
        <div className="w-64 h-64 bg-white p-4 rounded-2xl border-2 border-slate-900 shadow-md mx-auto flex flex-col items-center justify-center relative">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            {/* Outer Position Detection Squares */}
            <rect x="5" y="5" width="28" height="28" rx="4" fill="#0F172A" />
            <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
            <rect x="13" y="13" width="12" height="12" rx="1" fill="#2563EB" />

            <rect x="67" y="5" width="28" height="28" rx="4" fill="#0F172A" />
            <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
            <rect x="75" y="13" width="12" height="12" rx="1" fill="#2563EB" />

            <rect x="5" y="67" width="28" height="28" rx="4" fill="#0F172A" />
            <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
            <rect x="13" y="75" width="12" height="12" rx="1" fill="#2563EB" />

            {/* Pattern Data Grid */}
            <rect x="40" y="8" width="6" height="6" fill="#0F172A" />
            <rect x="50" y="8" width="6" height="6" fill="#2563EB" />
            <rect x="40" y="20" width="6" height="6" fill="#0F172A" />
            <rect x="48" y="26" width="6" height="6" fill="#0F172A" />

            <rect x="8" y="40" width="6" height="6" fill="#2563EB" />
            <rect x="20" y="40" width="6" height="6" fill="#0F172A" />
            <rect x="28" y="48" width="6" height="6" fill="#2563EB" />

            <rect x="40" y="40" width="20" height="20" rx="4" fill="#2563EB" />
            <text x="50" y="54" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
              PK
            </text>

            <rect x="68" y="40" width="6" height="6" fill="#0F172A" />
            <rect x="80" y="48" width="6" height="6" fill="#2563EB" />
            <rect x="40" y="68" width="6" height="6" fill="#0F172A" />
            <rect x="52" y="76" width="6" height="6" fill="#2563EB" />
            <rect x="68" y="68" width="6" height="6" fill="#2563EB" />
            <rect x="76" y="80" width="6" height="6" fill="#0F172A" />
          </svg>
        </div>

        {/* Supported Logos Row */}
        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-400 font-bold">
          <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM UPI</span>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Link
            href="/scan"
            className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
          >
            <span>📷 Simulate Customer Scan & Pay</span>
          </Link>

          <button
            onClick={handleCopy}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition cursor-pointer text-xs"
          >
            {copied ? '✓ UPI Link Copied!' : 'Copy Payment Link'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        PayKaro Merchant QR Code • Print and display at your shop counter
      </footer>
    </div>
  );
}
