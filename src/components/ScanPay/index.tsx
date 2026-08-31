'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ScanPay() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [scannedPayee, setScannedPayee] = useState<{ name: string; vpa: string; icon: string } | null>(null);
  const [amount, setAmount] = useState('350');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Wallet'>('UPI');
  const [paymentState, setPaymentState] = useState<'scan' | 'amount' | 'processing' | 'success'>('scan');
  const [txnId, setTxnId] = useState('');

  // Sample Preset Store QRs for demo
  const presetStores = [
    { name: 'Star Kirana Store', vpa: 'starkirana@paykaro', icon: '🏪' },
    { name: 'Coffee Day Express', vpa: 'coffeeday@paykaro', icon: '☕' },
    { name: 'Mithun PayKaro Merchant', vpa: 'mithun.bl@paykaro', icon: '💳' },
  ];

  // Request camera stream if available
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.log('Camera access denied or unavailable in demo mode');
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleSelectStore = (store: typeof presetStores[0]) => {
    setScannedPayee(store);
    setPaymentState('amount');
  };

  const speakVoiceChime = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePay = () => {
    setPaymentState('processing');
    const numericAmt = parseFloat(amount) || 100;
    const generatedTxn = 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
    setTxnId(generatedTxn);

    setTimeout(() => {
      setPaymentState('success');
      speakVoiceChime(`Received ${numericAmt} rupees on PayKaro`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between z-10">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-lg tracking-tight">PayKaro Scan & Pay</span>
        <div className="w-10"></div>
      </header>

      {/* Body Section */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 z-10 max-w-md w-full mx-auto">
        {paymentState === 'scan' && (
          <div className="w-full text-center space-y-6">
            <div className="relative w-72 h-72 mx-auto rounded-3xl overflow-hidden border-2 border-white/30 bg-slate-800 shadow-2xl flex items-center justify-center">
              {/* Live Video Feed or Mock Scanner Viewport */}
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

              {/* Scanner Corner Frame Overlays */}
              <div className="absolute inset-4 pointer-events-none border-2 border-dashed border-blue-400/80 rounded-2xl flex items-center justify-center">
                {/* Laser Animation Line */}
                <div className="w-full h-0.5 bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-pulse"></div>
              </div>

              {!cameraActive && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-3">📷</span>
                  <p className="text-sm font-semibold text-white">Point camera at any UPI QR Code</p>
                  <p className="text-xs text-slate-400 mt-1">Or click a demo store below</p>
                </div>
              )}
            </div>

            {/* Demo Store Selector */}
            <div className="space-y-3 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Or tap a sample store to scan:
              </p>
              <div className="space-y-2">
                {presetStores.map((store) => (
                  <button
                    key={store.vpa}
                    onClick={() => handleSelectStore(store)}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between transition cursor-pointer border border-white/10"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-2xl">{store.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white">{store.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{store.vpa}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                      Scan Store
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enter Amount State */}
        {paymentState === 'amount' && scannedPayee && (
          <div className="w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center">
              <span className="text-4xl block mb-2">{scannedPayee.icon}</span>
              <h2 className="text-xl font-extrabold text-slate-900">{scannedPayee.name}</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{scannedPayee.vpa}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Enter Bill Amount</label>
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-extrabold text-slate-400">₹</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-40 text-4xl font-extrabold text-slate-900 text-center bg-transparent outline-none"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'BHIM UPI', icon: '📱' },
                  { id: 'Card', label: 'Card', icon: '💳' },
                  { id: 'Wallet', label: 'Wallet', icon: '👛' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{pm.icon}</span>
                    <span className="text-xs">{pm.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition cursor-pointer text-base"
            >
              Pay ₹{parseFloat(amount || '0').toFixed(2)}
            </button>
          </div>
        )}

        {/* Processing Loader State */}
        {paymentState === 'processing' && (
          <div className="w-full bg-white text-slate-900 rounded-3xl p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-xl font-bold text-slate-900">Processing Payment...</h3>
            <p className="text-xs text-slate-500">
              Transferring ₹{parseFloat(amount || '0').toFixed(2)} to {scannedPayee?.name}
            </p>
          </div>
        )}

        {/* Payment Success State */}
        {paymentState === 'success' && scannedPayee && (
          <div className="w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h3>
              <p className="text-slate-500 text-sm mt-1">Paid to <span className="font-bold text-slate-800">{scannedPayee.name}</span></p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-extrabold text-slate-900 text-sm">₹{parseFloat(amount || '0').toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-semibold text-slate-700">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-500">Transaction Ref</span>
                <span className="font-mono text-slate-800 font-bold">{txnId}</span>
              </div>
            </div>

            {/* Audio Voice Reminder Badge */}
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
              <span>🔊</span>
              <span>Audio Soundbox Alert Triggered!</span>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition cursor-pointer text-sm"
            >
              Back to Merchant Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 z-10">
        <p>🔒 256-bit Encrypted Payments by PayKaro</p>
      </footer>
    </div>
  );
}
