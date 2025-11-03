import { ProductDetail } from "@/components/ui/ProductDetail";
import { getProductById, getPricesForProduct, formatPrice } from '@/lib/chargily';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  const prices = await getPricesForProduct(id);

  const primaryPrice = prices.length > 0 
    ? prices.reduce((min, price) => 
        price.amount < min.amount ? price : min
      )
    : null;

  const productWithPrice = {
    ...product,
    prices: prices,
    primaryPrice: primaryPrice,
    priceInDZD: primaryPrice ? parseFloat(formatPrice(primaryPrice.amount)) : 0,
    price_id: primaryPrice ? primaryPrice.id : '',
  };

  return <ProductDetail product={productWithPrice} />;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description || `Buy ${product.name}`,
  };
}