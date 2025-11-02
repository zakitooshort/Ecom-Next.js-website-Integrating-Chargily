import {ProductWithPrice} from '@/lib/chargily';
import { ProductCard } from './ProductCard';

interface ProductsProps{
 products: ProductWithPrice[];
}
export const ProductsList = ({products}:ProductsProps)=>{

    return (
     <div>
        <div>
            <input type="text" placeholder='Search Products...' />
        </div>
        <ul>
            {products.map((product,key)=>{
                return (
                <li key={key}>
                     <ProductCard product={product}/> 
                </li>)
            })}
        </ul>
      
     </div>)

}