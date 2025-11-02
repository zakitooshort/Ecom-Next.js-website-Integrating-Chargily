'use server'

import { chargilyClient, formatAmount } from '@/lib/chargily';

interface CheckoutOptions {
  paymentMethod?: 'edahabia' | 'cib';
  locale?: 'ar' | 'en' | 'fr';
  passFees?: boolean;
  collectShipping?: boolean;
  metadata?: Record<string, any>;
}

interface ProductData {
  name: string;
  description: string;
  amount: number;
  quantity?: number;
  paymentMethod?: 'edahabia' | 'cib';
}

export async function createCheckout(productData: ProductData) {
  try {
    if (!productData.name || !productData.amount) {
      throw new Error('Product name and amount are required');
    }

    if (productData.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const product = await chargilyClient.createProduct({
      name: productData.name,
      description: productData.description || `Purchase of ${productData.name}`,
    });

    const price = await chargilyClient.createPrice({
      amount: formatAmount(productData.amount), 
      currency: 'dzd',
      product_id: product.id,
    });

    const checkout = await chargilyClient.createCheckout({
      items: [
        {
          price: price.id,
          quantity: productData.quantity || 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?checkout_id={CHECKOUT_ID}`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?checkout_id={CHECKOUT_ID}`,
      payment_method: productData.paymentMethod || 'edahabia',
      locale: 'ar',
      pass_fees_to_customer: false,
      metadata: {
        product_name: productData.name,
      },
    });

    return {
      success: true,
      checkoutUrl: checkout.checkout_url,
      checkoutId: checkout.id,
    };

  } catch (error) {
    console.error('Checkout creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout',
    };
  }
}

export async function createCheckoutWithExistingProduct(
  priceId: string, 
  quantity: number = 1, 
  options: CheckoutOptions = {}
) {
  try {
    const checkout = await chargilyClient.createCheckout({
      items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?checkout_id={CHECKOUT_ID}`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?checkout_id={CHECKOUT_ID}`,
      payment_method: options.paymentMethod || 'edahabia',
      locale: options.locale || 'ar',
      pass_fees_to_customer: options.passFees || false,
      collect_shipping_address: options.collectShipping || false,
      metadata: options.metadata || {},
    });

    return {
      success: true,
      checkoutUrl: checkout.checkout_url,
      checkoutId: checkout.id,
    };
  } catch (error) {
    console.error('Checkout creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout',
    };
  }
}