# E-Commerce Store with Chargily Pay Integration

A modern e-commerce website built with Next.js , featuring payment integration with Chargily Pay supporting EDAHABIA and CIB cards (test mode).


##  Features


- **Product Catalog**: Browse products with detailed pages and images
- **Shopping Cart**: Add/remove items with persistent cart state using Zustand
- **Payment Integration**: Secure checkout with Chargily Pay (EDAHABIA & CIB support)
- **Server-Side Rendering**: Fast page loads with Next.js App Router
- **TypeScript**: Type-safe code throughout the application
- **Test Mode**: Fully functional test environment for development

##  Tech Stack

- **Framework**: [Next.js ](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Payment Gateway**: [Chargily Pay](https://chargily.com/)
- **Image Optimization**: Next.js Image component

##  Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Chargily Pay account ([Sign up here](https://pay.chargily.com/))
- Chargily API keys (test and/or live mode)

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/zakitooshort/Ecom-Next.js-website-Integrating-Chargily.git
cd ecom
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Chargily Configuration
CHARGILY_API_KEY=test_sk_your_test_api_key_here
CHARGILY_MODE=test

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Getting your Chargily API keys:**
1. Go to [Chargily Dashboard](https://pay.chargily.com/test/dashboard)
2. Navigate to Settings → API Keys
3. Copy your test API key (starts with `test_sk_`)

### 4. Set up products in Chargily

You need to create products and prices in Chargily before using the checkout:

1. Go to your Chargily Dashboard
2. Navigate to Products
3. Create your products with prices
4. Note the Price IDs - you'll need these

Alternatively, you can use the Chargily API to create products programmatically (see `/lib/chargily.ts`).

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### Shopping Cart (Zustand)

The cart uses Zustand for state management with localStorage persistence:

```typescript
const { items, addItem, removeItem, clearCart } = useCartStore();
```

### Chargily Integration

Products are fetched from Chargily and include price information:

```typescript
const products = await getProductsWithPrices();
```

Checkout creates a payment session and redirects to Chargily:

```typescript
const checkout = await chargilyClient.createCheckout({
  items: checkoutItems,
  success_url: '...',
  failure_url: '...',
});
```

##  Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `CHARGILY_API_KEY` (use your live key for production)
   - `CHARGILY_MODE=live`
   - `NEXT_PUBLIC_BASE_URL=https://yourdomain.com`
4. Deploy!

**Important**: Remember to:
- Update webhook endpoints in Chargily dashboard
- Use live API keys for production
- Set `CHARGILY_MODE=live`

##  Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Chargily Pay Documentation](https://dev.chargily.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Acknowledgments

- [Chargily](https://chargily.com/) for providing the payment gateway
