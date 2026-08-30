# PayKaro

A full-stack digital payment platform built with Next.js and Razorpay.

## Overview

PayKaro is a full-stack digital payment platform that allows users to securely
create payments, complete transactions through Razorpay, and track their
payment history from a personal dashboard.

## Features

- User registration and login
- Protected dashboard
- Create payments
- Razorpay payment integration
- UPI, card and net banking support through Razorpay
- Payment verification
- Razorpay webhook handling
- Transaction history
- Payment status tracking
- Transaction details
- Responsive dashboard

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Razorpay
- Zod
- React Hook Form

## Application Flow

Login → Dashboard → Create Payment → Razorpay Checkout → Payment Verification
→ Webhook → Database → Transaction History

## Payment Flow

1. User enters the payment amount.
2. Next.js backend creates a Razorpay order.
3. Razorpay Checkout is opened.
4. User completes the payment.
5. Payment details are verified on the server.
6. Razorpay webhook confirms the payment event.
7. Transaction status is updated in PostgreSQL.
8. Dashboard displays the updated transaction.

## Project Structure

<!-- ```text
src/
├── app/
├── components/
├── lib/
└── types/

prisma/
└── schema.prisma -->