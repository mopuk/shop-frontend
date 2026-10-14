# Shop Frontend

A pet project for a modern storefront built with Next.js. The app focuses on a smooth shopping experience: browsing products, filtering catalog results, managing a cart, creating an account, tracking orders, and completing checkout with Stripe.

## Overview

This frontend consumes a backend API for catalog data, authentication, user profile data, cart operations, orders, and payment intent creation. It is designed as a clean, ecommerce-style interface with a polished landing page and product-driven flows.

## Features

- Home page with hero, featured products, categories, brands, and newsletter section
- Product catalog with filtering, sorting, and pagination
- Product detail pages with selected variants and add-to-cart interactions
- Cart management with quantity updates and summary totals
- Authentication flow for login and signup
- Profile and order history views
- Stripe-powered checkout flow for order payments

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query for data fetching
- Stripe React SDK
- shadcn-style UI primitives

## Project Structure

```text
src/
├── app/                  # App Router pages and routes
├── components/           # Shared layout and UI components
├── entities/             # API models and typed domain data
├── features/             # Feature modules (auth, cart, catalog, payment)
├── shared/               # Shared utilities and types
└── ...
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and set your backend URL:

```bash
NEXT_PUBLIC_BACKEND_API=http://localhost:8000
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser.
