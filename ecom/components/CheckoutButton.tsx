'use client'

import { useState, useTransition } from 'react';
import { createCheckout } from '@/app/actions/chargily';
import { ReactNode } from 'react';

interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity?: number;
  paymentMethod?: 'edahabia' | 'cib';
}

interface CheckoutButtonProps {
  product: ProductData;
  className?: string;
  children?: ReactNode;
}

export default function CheckoutButton({ 
  product,
  className = '',
  children 
}: CheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);

    startTransition(async () => {
      try {
        const result = await createCheckout({
          name: product.name,
          description: product.description,
          amount: product.price, 
          quantity: product.quantity || 1,
          paymentMethod: product.paymentMethod || 'edahabia',
        });

        if (result.success) {
          window.location.href = result.checkoutUrl!;
        } else {
          setError(result.error || 'Failed to create checkout');
        }
      } catch (err) {
        console.error('Checkout error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={isPending}
        className={`
          bg-blue-600 text-white px-6 py-3 rounded-lg 
          hover:bg-blue-700 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          children || 'Proceed to Checkout'
        )}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}