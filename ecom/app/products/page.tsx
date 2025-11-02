import { getProductsWithPrices } from '@/lib/chargily';
import ProductCard from '@/components/ProductCard';

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600">
          Browse our collection of {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Products',
  description: 'Browse our product catalog',
};