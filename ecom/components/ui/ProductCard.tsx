import {ProductWithPrice} from '@/lib/chargily';
import Link from 'next/link';
import { Card,CardHeader,CardTitle,CardContent } from './card';
import Image from 'next/image';

interface ProductProps{
 product: ProductWithPrice;
}
export const ProductCard = ({product}:ProductProps)=>{

    return <Link href={"/products/1"}>
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
                 <CardHeader>
                    <CardTitle>
                        {product.name}
                    </CardTitle>
                    <CardContent>
                        {product.description}
                    </CardContent>
                 </CardHeader>
        </Card>
    </Link>
     ;

};