'use client'

import { useState, useTransition } from 'react';
import { createCheckoutWithExistingProduct } from '@/app/actions/chargily';
import { formatPrice } from '@/lib/chargily';
import type { ChargilyProduct, ChargilyPrice } from '@/lib/chargily';

interface ProductCheckoutProps {
  product: ChargilyProduct;
  prices: ChargilyPrice[];
}

export default function ProductCheckout({ product, prices }: ProductCheckoutProps) {
  const [selectedPrice, setSelectedPrice] = useState<ChargilyPrice>(prices[0]);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    startTransition(async () => {
      try {
        const result = await createCheckoutWithExistingProduct(
          selectedPrice.id,
          quantity,
          {
            metadata: {
              product_name: product.name,
              product_id: product.id,
              price_metadata: selectedPrice.metadata,
            }
          }
        );

        if (result.success) {
          window.location.href = result.checkoutUrl!;
        } else {
          setError(result.error || 'Failed to create checkout');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      }
    });
  };

  return (
    <div className="space-y-4">
      {prices.length > 1 && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Option
          </label>
          <select
            value={selectedPrice.id}
            onChange={(e) => {
              const price = prices.find(p => p.id === e.target.value);
              if (price) setSelectedPrice(price);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {prices.map((price) => (
              <option key={price.id} value={price.id}>
                {formatPrice(price.amount)} DZD
                {price.metadata?.label && ` - ${price.metadata.label}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Unit Price</span>
          <span className="font-semibold">
            {formatPrice(selectedPrice.amount)} DZD
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-blue-600">
            {formatPrice(selectedPrice.amount * quantity)} DZD
          </span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isPending}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Processing...
          </span>
        ) : (
          'Proceed to Checkout'
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}