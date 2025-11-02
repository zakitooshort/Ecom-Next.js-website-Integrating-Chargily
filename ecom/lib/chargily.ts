import { ChargilyClient } from '@chargily/chargily-pay';

if (!process.env.CHARGILY_API_KEY || !process.env.CHARGILY_MODE) {
  throw new Error('Missing Chargily environment variables');
}

export const chargilyClient = new ChargilyClient({
  api_key: process.env.CHARGILY_API_KEY,
  mode: process.env.CHARGILY_MODE as 'test' | 'live',
});

// Type definitions
export interface ChargilyProduct {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  metadata: Record<string, any>;
  created_at: number;
  updated_at: number;
}

export interface ChargilyPrice {
  id: string;
  amount: number;
  currency: string;
  product_id: string;
  metadata: Record<string, any>;
  created_at: number;
  updated_at: number;
}

export interface ProductWithPrice extends ChargilyProduct {
  prices: ChargilyPrice[];
  primaryPrice: ChargilyPrice | null;
  priceInDZD: number;
}

export function formatPrice(amountInCentimes: number): string {
  return (amountInCentimes / 100).toFixed(2);
}

export function formatAmount(amountInDZD: number): number {
  return Math.round(amountInDZD * 100);
}

export async function getAllProducts(perPage: number = 50): Promise<ChargilyProduct[]> {
  try {
    const response = await chargilyClient.listProducts(perPage);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(productId: string): Promise<ChargilyProduct | null> {
  try {
    const product = await chargilyClient.getProduct(productId);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getAllPrices(perPage: number = 50): Promise<ChargilyPrice[]> {
  try {
    const response = await chargilyClient.listPrices(perPage);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching prices:', error);
    return [];
  }
}

export async function getPricesForProduct(productId: string): Promise<ChargilyPrice[]> {
  try {
    const allPrices = await getAllPrices();
    return allPrices.filter(price => price.product_id === productId);
  } catch (error) {
    console.error('Error fetching product prices:', error);
    return [];
  }
}

export async function getProductsWithPrices(): Promise<ProductWithPrice[]> {
  try {
    const [products, prices] = await Promise.all([
      getAllProducts(),
      getAllPrices()
    ]);

    const productsWithPrices: ProductWithPrice[] = products.map(product => {
      const productPrices = prices.filter(price => price.product_id === product.id);
      
      const primaryPrice = productPrices.length > 0 
        ? productPrices.reduce((min, price) => 
            price.amount < min.amount ? price : min
          )
        : null;

      return {
        ...product,
        prices: productPrices,
        primaryPrice: primaryPrice,
        priceInDZD: primaryPrice ? parseFloat(formatPrice(primaryPrice.amount)) : 0,
      };
    });

    return productsWithPrices;
  } catch (error) {
    console.error('Error getting products with prices:', error);
    return [];
  }
}