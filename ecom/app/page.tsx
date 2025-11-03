import Link from 'next/link';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import { getProductsWithPrices } from '@/lib/chargily';
import {ProductCard} from '@/components/ui/ProductCard';
import { Carousel } from '@/components/carousel';

export const revalidate = 3600; 

export default async function HomePage() {
  const products = await getProductsWithPrices( );
  const product = products[0];
 
  console.log(products);
  return (
    <div>
     <section className="rounded bg-neutral-100 py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Welcome to My Take on implementing chargily on an algerian ecom website</h2>
          <p className="text-netural-600">Test the functionnalities of this website</p>
          <Button asChild variant="default"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white">
            <Link href="/products" className="inline-flex items-center justify-center rounded-full px-6 py-3">Browse All Products</Link>
          </Button>
        </div>
        <Image alt="Banner Image"
        className="rounded"
         width={450}
          height={450}
           src={product.images[0]} />
      </div>
     </section>
     <section className="py-8">
       <Carousel product={products}/>
     </section>
    </div>
  );
}

export const metadata = {
  title: 'Home - Your Store Name',
  description: 'Shop quality products with secure payment through EDAHABIA & CIB',
};