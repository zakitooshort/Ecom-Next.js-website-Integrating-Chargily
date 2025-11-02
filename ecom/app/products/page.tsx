import { getProductsWithPrices } from '@/lib/chargily';
import {ProductsList} from '@/components/ui/ProductsList';

export const revalidate = 3600; 

export default async function ProductsPage() {
  const products = await getProductsWithPrices();

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No Products Found</h1>
        <p className="text-gray-600">
          Please add products in your Chargily Dashboard first.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-8">
       <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      <ProductsList products={products}/>
    </div>
  );
}

export const metadata = {
  title: 'Products',
  description: 'Browse our product catalog',
};