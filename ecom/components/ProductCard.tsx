'use client'

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { createCheckoutWithExistingProduct } from '@/app/actions/chargily';
import type { ProductWithPrice } from '@/lib/chargily';

interface ProductCardProps {
  product: ProductWithPrice;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = () => {
    if (!product.primaryPrice) {
      setError('No price available for this product');
      return;
    }

    startTransition(async () => {
      try {
        const result = await createCheckoutWithExistingProduct(
          product.primaryPrice.id,
          1,
          {
            metadata: {
              product_name: product.name,
              product_id: product.id,
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {product.priceInDZD.toLocaleString('fr-DZ')} DZD
          </span>
        </div>

        <button
          onClick={handleBuyNow}
          disabled={isPending || !product.primaryPrice}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Processing...
            </span>
          ) : !product.primaryPrice ? (
            'No Price Available'
          ) : (
            'Buy Now'
          )}
        </button>

        {error && (
          <p className="mt-2 text-xs text-red-600">{error}</p>
        )}

        {product.prices && product.prices.length > 1 && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            {product.prices.length} price options available
          </p>
        )}
      </div>
    </div>
  );
}