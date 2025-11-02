import Link from 'next/link';
import Image from 'next/image';
import { getProductsWithPrices } from '@/lib/chargily';
import ProductCard from '@/components/ProductCard';

export const revalidate = 3600; 

export default async function HomePage() {
  const products = await getProductsWithPrices(
    
  );
 
  console.log(products);
  return (
    <div className="min-h-screen">
    
    </div>
  );
}

export const metadata = {
  title: 'Home - Your Store Name',
  description: 'Shop quality products with secure payment through EDAHABIA & CIB',
};