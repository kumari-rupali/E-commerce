# 🛍️ Rupali E-Commerce Store

A modern, responsive e-commerce web application inspired by large Indian shopping platforms. Built with React, TypeScript, Vite, Tailwind CSS, Firebase, Zustand, and Stripe-ready checkout integration.

## ✨ Highlights

- 🏠 Modern storefront and product discovery
- 🔎 Product browsing and product detail pages
- 🛒 Persistent shopping cart experience
- 👤 Authentication and user profile flows with Firebase
- 📦 Orders and order history
- 📍 Address management during checkout
- 💳 Stripe-ready checkout flow
- 💰 Currency-aware pricing
- 🔔 Toast notifications
- 📱 Responsive UI for mobile, tablet, and desktop
- 🎨 Motion-based interactions and polished UI components
- 🔐 Firestore security rules included

## 🧰 Tech Stack

**Frontend:** React 19, TypeScript, Vite

**Styling:** Tailwind CSS 4

**State:** Zustand

**Routing:** React Router

**Backend / Data:** Firebase / Firestore

**Payments:** Stripe integration

**UI & Animation:** Lucide React, Motion, Sonner

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components
├── lib/              # Firebase, database and utility modules
├── pages/            # Application screens
├── constants.ts      # Product and application constants
├── App.tsx           # Application routing and shell
├── main.tsx          # React entry point
└── index.css         # Global styles
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/kumari-rupali/E-commerce.git
cd E-commerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` and add the Firebase / application variables required by the project. Use `.env.example` as the reference.

Never commit private API keys or secrets.

### 4. Start development

```bash
npm run dev
```

The Vite development server will display the local URL in your terminal.

## 🏗️ Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are placed in `dist/`.

## ☁️ Deploy to Vercel

This repository is configured as a Vite frontend application.

In Vercel:

1. Import `kumari-rupali/E-commerce`.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add the required environment variables from `.env.example` in Vercel Project Settings.
6. Deploy.

> **Important:** Stripe secret keys must never be exposed in browser-side environment variables. The current repository contains server-side Stripe code that should be deployed separately as a server/API service if real Stripe payments are enabled. For a static Vercel deployment, use the frontend/demo checkout flow unless the payment API is hosted separately.

## 🔐 Environment Variables

See `.env.example` for the variables expected by the application. Keep secrets out of Git and configure them through your local environment or Vercel Project Settings.

## 🎯 Portfolio Value

This project demonstrates practical frontend engineering skills including:

- Component-based React architecture
- TypeScript development
- Client-side routing
- Global state management with Zustand
- Firebase integration
- Firestore data operations
- Authentication flows
- Shopping cart and order workflows
- Responsive UI development
- Payment integration concepts
- Production build and deployment configuration

## 📌 Disclaimer

This is an independent learning/portfolio project inspired by common e-commerce patterns. It is not affiliated with or endorsed by Flipkart or any other commercial brand.

## 👩‍💻 Author

**Kumari Rupali**

Frontend Developer | React.js | JavaScript | TypeScript

GitHub: https://github.com/kumari-rupali
