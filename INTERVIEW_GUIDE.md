# 💳 PayKaro - Full Technical Architecture & Interview Guide

---

## 📌 Executive Overview

| Project Property | Implementation Details |
| :--- | :--- |
| **Application Name** | **PayKaro** |
| **Primary Domain** | Payment Gateway & Merchant FinTech Portal |
| **Target Audience** | Online E-Commerce Merchants & Physical In-Store Retail Shops |
| **Core Framework** | Next.js 16 (App Router) |
| **UI Library & CSS** | React 19 + Tailwind CSS v4 |
| **Primary Language** | TypeScript |
| **Hardware APIs** | Web Media Devices (`getUserMedia`), Web Speech API (`SpeechSynthesis`) |

---

## 🏗️ Project Architecture & Directory Structure

```text
paykaro/
├── INTERVIEW_GUIDE.md             # Project Architecture & Interview Reference
├── public/
│   ├── images/
│   │   └── logo.png                # PayKaro Brand Logo Asset
│   └── svg/
│       ├── check.svg               # Feature Checkmark Icon
│       ├── eye.svg                 # Password View Toggle Icon
│       └── eye-off.svg             # Password Hide Toggle Icon
└── src/
    ├── app/                        # Next.js App Router Shell Routes
    │   ├── page.tsx                # Root Route -> Renders <Login />
    │   ├── login/page.tsx          # Login Page (/login)
    │   ├── register/page.tsx       # Registration Page (/register)
    │   ├── forgot-password/        # Password Recovery Page (/forgot-password)
    │   ├── dashboard/              # Merchant Analytics Portal (/dashboard)
    │   ├── scan/                   # In-Store Scan & Pay Scanner (/scan)
    │   └── store-qr/               # Printable Merchant Store QR (/store-qr)
    ├── components/                 # Reusable Modular Client Components
    │   ├── Login/index.tsx         # 50/50 Desktop Split Login Form
    │   ├── Register/index.tsx      # 50/50 Desktop Split Registration Form
    │   ├── ForgotPassword/         # Password Reset & Email Confirmation Flow
    │   ├── Dashboard/index.tsx     # Merchant Portal, Metrics & Checkout Modal
    │   ├── ScanPay/index.tsx       # Real-time QR Camera Scanner & Soundbox Alert
    │   └── StoreQR/index.tsx       # Merchant Counter QR Standee
    └── styles/
        ├── globals.css             # Tailwind v4 Root Styles (@import "tailwindcss")
        └── typography.css          # Global Typography Definitions (h1-h6, p)
```

---

## 🚀 Key Feature Breakdown & Implementation Details

### 1. 🔐 Authentication Suite (`/login`, `/register`, `/forgot-password`)

* **Edge-to-Edge 50/50 Desktop Split**:
  * Formatted using Tailwind CSS Grid: `grid grid-cols-12 min-h-screen`.
  * Left Hero Panel: `col-span-12 lg:col-span-6` solid Royal Blue (`#2563EB`).
  * Right Form Panel: `col-span-12 lg:col-span-6` clean white container.

* **Dot Grid Background Pattern**:
  * Built using pure CSS radial gradient overlays:
  ```css
  background-image: radial-gradient(rgba(255, 255, 255, 0.9) 1.5px, transparent 1.5px);
  background-size: 28px 28px;
  ```

* **Text Readability & Contrast**:
  * Applied `drop-shadow-sm` on white text headings and bullet items over high-contrast white dot overlays to maintain 100% legibility.

* **Browser Autofill Suppression**:
  * Combined modern input attributes to suppress unwanted Chrome/Safari popups:
  ```tsx
  autoComplete="off"
  autoCorrect="off"
  autoCapitalize="off"
  spellCheck={false}
  ```

* **Client-Side Navigation**:
  * Integrated Next.js `useRouter()` from `next/navigation` to route users smoothly to `/dashboard` upon form submission.

---

### 2. 📊 Merchant Portal & Live Dashboard (`/dashboard`)

* **Live Stat Cards**:
  * `TOTAL BALANCE`: **₹42,580.00** *(Updated dynamically on transaction completion)*
  * `TOTAL PAYMENTS`: **128** *(Increments live)*
  * `SUCCESSFUL`: **116** *(90.6% success rate)*
  * `PENDING`: **5** *(Avg. 2 min settle time)*

* **Real-Time Live Transaction Search**:
  * Filters transaction records instantly without backend delay:
  ```tsx
  const filteredTransactions = transactions.filter((tx) =>
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  ```

* **Interactive Quick Payment Checkout**:
  * Enter any amount (e.g. `₹20`, `₹50`, `₹100`) and click **"Continue to Pay"**.
  * Opens a checkout modal supporting **UPI**, **Card**, and **Net Banking**.
  * Simulates secure processing, generates a unique transaction ID (`TXN72849199`), and prepends the record to the table while updating total balance.

* **User Profile & Notification Popovers**:
  * Top-right user avatar (`MK Mithun v`) toggles a dropdown menu with user profile details, status badges (*Admin/Merchant*), settings, and a functional **Logout** button.

---

### 3. 📷 In-Store "Scan & Pay" Camera Scanner (`/scan`)

* **Camera Viewport Integration**:
  * Captures rear-facing device camera stream via `navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })`.
  * Renders an animated laser scanner viewport with fallback sample stores (*Star Kirana Store*, *Coffee Day Express*, *Mithun PayKaro Merchant*).

* **Web Audio Soundbox Voice Notification**:
  * Replicates physical POS soundbox speakers (PhonePe / Paytm soundboxes) using the browser's Web Speech API (`SpeechSynthesisUtterance`):
  ```tsx
  const speakVoiceChime = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };
  // Announces: "Received 350 rupees on PayKaro" upon payment completion
  ```

---

### 4. 🔲 Merchant Store QR Standee (`/store-qr`)

* **Printable Counter Standee**:
  * Displays a vector UPI QR code pre-configured with merchant VPA ID (`mithun.bl@paykaro`).
  * Complies with NPCI UPI link standards: `upi://pay?pa=mithun.bl@paykaro&pn=Mithun%20PayKaro%20Store`.
  * Includes a **"Simulate Customer Scan"** action button that directly opens the camera scanner.

---

## 🎯 Interview Cheat Sheet & Key Questions

### 1. Opening Project Pitch (30-Second Summary)
> *"I developed PayKaro, a Next.js 16 and TypeScript payment gateway application. It addresses both online merchant payment workflows via an analytics dashboard and physical retail checkouts via a camera-based QR scanner with real-time Web Speech voice alerts. My focus was clean architecture, Tailwind CSS v4 design system, accessibility, and zero-latency user feedback."*

### 2. Frequently Asked Technical Questions

| Question | Clear Interview Answer |
| :--- | :--- |
| **Q: How is Next.js App Router utilized?** | *Page routes inside `src/app/` serve as clean route entry points that import client components (`'use client'`) from `src/components/`, optimizing bundle size and separating concerns.* |
| **Q: How did you fix browser autofill issues?** | *Modern browsers often override `autocomplete="off"`. I enforced input suppression by combining `autoComplete="off"`, `autoComplete="new-password"`, `autoCorrect="off"`, and `spellCheck={false}`.* |
| **Q: How does the in-store soundbox feature work?** | *I leveraged the browser's native Web Speech API (`window.speechSynthesis`). Upon transaction success, it programmatically triggers a voice announcement stating the received amount.* |
| **Q: How would you handle real-time payment updates at scale?** | *By replacing local state management with a WebSocket connection or Server-Sent Events (SSE) from the backend payment gateway server (or Firebase `onSnapshot` listener).* |

---

*PayKaro Documentation — Saved in project root at `/INTERVIEW_GUIDE.md`.*
