'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('7D');
  const [quickAmount, setQuickAmount] = useState('20');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Payment Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Net Banking'>('UPI');
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentAmount, setPaymentAmount] = useState('20');
  const [lastTxnId, setLastTxnId] = useState('');

  // Dashboard Live Metrics
  const [balance, setBalance] = useState(42580.00);
  const [totalPaymentsCount, setTotalPaymentsCount] = useState(128);
  const [successCount, setSuccessCount] = useState(116);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN72849153',
      payee: 'Amazon Shopping',
      amount: '₹2,499.00',
      method: 'UPI',
      status: 'Success',
      date: '28 Aug 2026, 4:32 PM',
    },
    {
      id: 'TXN72849128',
      payee: 'Electricity Board',
      amount: '₹1,875.00',
      method: 'Net Banking',
      status: 'Success',
      date: '27 Aug 2026, 11:02 AM',
    },
    {
      id: 'TXN72848991',
      payee: 'Swiggy Order',
      amount: '₹540.00',
      method: 'UPI',
      status: 'Pending',
      date: '27 Aug 2026, 9:14 AM',
    },
    {
      id: 'TXN72848870',
      payee: 'Netflix Subscription',
      amount: '₹649.00',
      method: 'Card',
      status: 'Failed',
      date: '26 Aug 2026, 8:00 PM',
    },
    {
      id: 'TXN72848712',
      payee: 'Rahul Sharma',
      amount: '₹5,000.00',
      method: 'UPI',
      status: 'Success',
      date: '25 Aug 2026, 6:47 PM',
    },
  ]);

  const openCheckout = (amt?: string) => {
    const val = amt || quickAmount || '50';
    setPaymentAmount(val);
    setPaymentState('idle');
    setShowPaymentModal(true);
  };

  const handleProcessPayment = () => {
    setPaymentState('processing');
    const parsedAmt = parseFloat(paymentAmount) || 50;

    setTimeout(() => {
      const newTxnId = 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
      setLastTxnId(newTxnId);

      const newTxn = {
        id: newTxnId,
        payee: 'Quick Payment',
        amount: `₹${parsedAmt.toFixed(2)}`,
        method: paymentMethod,
        status: 'Success',
        date: 'Just now',
      };

      setTransactions((prev) => [newTxn, ...prev]);
      setBalance((prev) => prev + parsedAmt);
      setTotalPaymentsCount((prev) => prev + 1);
      setSuccessCount((prev) => prev + 1);
      setPaymentState('success');
    }, 1200);
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex relative">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden lg:flex">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-sm">
              P
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">PayKaro</span>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50/80 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/dashboard/payments"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Payments
            </Link>

            <Link
              href="/scan"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              📷 Scan & Pay
            </Link>

            <Link
              href="/store-qr"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              🔲 Store QR Code
            </Link>

            <Link
              href="/dashboard/transactions"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Transactions
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>

            <Link
              href="/dashboard/help"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help & Support
            </Link>
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative w-64 md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions, payees..."
                className="w-full pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 relative cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                </svg>
                <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2 border-2 border-white"></span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">2 New</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-2.5 bg-blue-50/50 rounded-xl flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Payment received</p>
                        <p className="text-xs text-slate-500">₹2,499.00 from Amazon Shopping</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">4:32 PM</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Daily Settlement</p>
                        <p className="text-xs text-slate-500">₹42,580.00 settled to bank account</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 cursor-pointer pl-2 border-l border-slate-200 select-none"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  MK
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden sm:inline">Mithun</span>
                <svg className="w-4 h-4 text-slate-400 hidden sm:inline transition-transform duration-150" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                        MK
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">Mithun BL</p>
                        <p className="text-xs text-slate-500 truncate">mithun.bl@terralogic.com</p>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                        Admin / Merchant
                      </span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile & Account
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings & API Keys
                    </Link>

                    <Link
                      href="/dashboard/payments"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Billing & Subscriptions
                    </Link>
                  </div>

                  <div className="pt-1 mt-1 border-t border-slate-100">
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                    >
                      <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Welcome Banner Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Welcome back, Mithun 👋
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Here's what's happening with your payments today.
              </p>
            </div>

            <button
              onClick={() => openCheckout('100')}
              className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-2 text-sm self-start sm:self-auto cursor-pointer"
            >
              <span>+ Make Payment</span>
            </button>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Balance */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL BALANCE</span>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Updated just now</p>
              </div>
            </div>

            {/* Card 2: Total Payments */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">TOTAL PAYMENTS</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{totalPaymentsCount}</h3>
                <p className="text-xs font-semibold text-emerald-600 mt-1">↗ +14 this week</p>
              </div>
            </div>

            {/* Card 3: Successful */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SUCCESSFUL</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{successCount}</h3>
                <p className="text-xs font-semibold text-emerald-600 mt-1">↗ 90.6% success rate</p>
              </div>
            </div>

            {/* Card 4: Pending */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PENDING</span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">5</h3>
                <p className="text-xs text-slate-400 mt-1">Avg. 2 min to settle</p>
              </div>
            </div>
          </div>

          {/* Middle Row: Analytics Chart & Quick Payment */}
          <div className="grid grid-cols-12 gap-6">
            {/* Payment Analytics Chart Card (8 Cols) */}
            <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Payment analytics</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Volume of payments processed</p>
                  </div>

                  <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
                    {['7D', '30D', '3M'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-md transition cursor-pointer ${activeTab === tab ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="h-56 w-full relative pt-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                    <line x1="0" y1="160" x2="600" y2="160" stroke="#F1F5F9" strokeWidth="1" />

                    {/* Fill Gradient Area */}
                    <polygon points="0,150 100,120 200,170 300,90 400,135 500,110 600,130 600,200 0,200" fill="url(#chartGradient)" />

                    {/* Smooth Spline Line */}
                    <polyline
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,150 100,120 200,170 300,90 400,135 500,110 600,130"
                    />
                  </svg>

                  {/* X Axis Labels */}
                  <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Payment Form (4 Cols) */}
            <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Payment</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    openCheckout();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2">Amount</label>
                    <div className="relative flex items-center">
                      <select className="absolute left-3 text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer">
                        <option>₹ INR</option>
                        <option>$ USD</option>
                        <option>€ EUR</option>
                      </select>
                      <input
                        type="text"
                        value={quickAmount}
                        onChange={(e) => setQuickAmount(e.target.value)}
                        placeholder="Enter amount (e.g. 50, 100)"
                        className="w-full pl-20 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition cursor-pointer text-sm"
                  >
                    Continue to Pay
                  </button>
                </form>
              </div>

              <div className="pt-6 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  💳 UPI • Card • Net Banking
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Table: Recent Transactions with Live Search Filter */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
                {searchQuery && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    Showing results matching <span className="font-semibold text-blue-600">"{searchQuery}"</span>
                  </p>
                )}
              </div>
              <Link href="/dashboard/transactions" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View all ›
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-6">TRANSACTION ID</th>
                    <th className="py-3.5 px-6">PAYEE</th>
                    <th className="py-3.5 px-6">AMOUNT</th>
                    <th className="py-3.5 px-6">METHOD</th>
                    <th className="py-3.5 px-6">STATUS</th>
                    <th className="py-3.5 px-6">DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-4 px-6 text-slate-600 font-mono text-xs">{tx.id}</td>
                        <td className="py-4 px-6 font-bold text-slate-900">{tx.payee}</td>
                        <td className="py-4 px-6 font-extrabold text-slate-900">{tx.amount}</td>
                        <td className="py-4 px-6 text-slate-600 text-xs">{tx.method}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${tx.status === 'Success'
                                ? 'bg-emerald-50 text-emerald-700'
                                : tx.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success'
                                  ? 'bg-emerald-500'
                                  : tx.status === 'Pending'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                            />
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-xs">{tx.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">
                        No transactions found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Payment Checkout Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 lg:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <span className="font-bold text-slate-900 text-lg">PayKaro Checkout</span>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            {paymentState === 'idle' && (
              <div className="py-6 space-y-6">
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 text-center">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Amount to Pay</p>
                  <p className="text-3xl font-extrabold text-slate-900">
                    ₹{parseFloat(paymentAmount || '0').toFixed(2)}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'UPI', label: 'UPI', icon: '📱' },
                      { id: 'Card', label: 'Card', icon: '💳' },
                      { id: 'Net Banking', label: 'NetBanking', icon: '🏦' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${paymentMethod === pm.id
                            ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                          }`}
                      >
                        <span className="text-lg block mb-1">{pm.icon}</span>
                        <span className="text-xs">{pm.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleProcessPayment}
                  className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition cursor-pointer text-sm"
                >
                  Pay ₹{parseFloat(paymentAmount || '0').toFixed(2)}
                </button>
              </div>
            )}

            {paymentState === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h3 className="text-lg font-bold text-slate-900">Processing Payment...</h3>
                <p className="text-xs text-slate-500">
                  Securing transaction of ₹{parseFloat(paymentAmount || '0').toFixed(2)} via {paymentMethod}
                </p>
              </div>
            )}

            {paymentState === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in-75 duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Payment Successful!</h3>
                <p className="text-sm text-slate-500">
                  ₹{parseFloat(paymentAmount || '0').toFixed(2)} paid successfully via {paymentMethod}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600">
                  Transaction ID: <span className="font-bold text-slate-900">{lastTxnId}</span>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl transition cursor-pointer text-sm mt-4"
                >
                  Done & Back to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
