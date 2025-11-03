import {ProductWithPrice} from '@/lib/chargily';
import Link from 'next/link';
import { Card,CardHeader,CardTitle,CardContent } from './card';
import Image from 'next/image';
import { Button } from "./button";

interface ProductProps{
 product: ProductWithPrice;
}
export const ProductCard = ({product}:ProductProps)=>{

    return (
      <Link href={`/products/${product.id}`}>
        <Card>
         {product.images && product.images[0] && (
                     <div className="relative h-80 w-full">
                         <Image src={product.images[0]}
                         alt={product.name}
                         fill
                         objectFit="cover"
                          className="transition-opacity duration-500 ease-in-out"
                         />
                     </div>
                 )}
                 <CardHeader className="p-4">
                    <CardTitle className="text-xl font-bold text-gray-800">
                        {product.name}
                    </CardTitle>
                    <CardContent className="p-4 flex-grow flex flex-col justify-between">
                        {product.description && (<p className="text-gray-600 text-sm mb-2">{product.description}</p>)}
                        <p className="text-lg font-semibold text-gray-900">{product.priceInDZD} DZD</p>
                        <Button className="rounded mt-4 bg-black text-white">View Details</Button>
                    </CardContent>
                 </CardHeader>
        </Card>
    </Link>)
     ;

};