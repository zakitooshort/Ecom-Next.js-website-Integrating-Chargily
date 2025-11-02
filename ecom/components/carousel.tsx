"use client";
import { Card,CardContent,CardTitle } from "./ui/card";
import { useState,useEffect } from "react";
import type { ProductWithPrice } from '@/lib/chargily';
import { getPricesForProduct } from "@/lib/chargily";
import Image from "next/image";

interface CarouselProps {
  product: ProductWithPrice[];
}
export const Carousel =({product}:CarouselProps)=>{
    const [current, setCurrent] = useState<number>(0);
    
    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrent((prev)=>(prev+1)%product.length);
        },3000);

        return () => clearInterval (interval);
    },[product.length]); 

    const currentProduct= product[current];
    const price = currentProduct.priceInDZD;
    

    return(
        <Card  className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
            {currentProduct.images && currentProduct.images[0] && (
            <div className="relative h-80 w-full">
                <Image src={currentProduct.images[0]}
                alt={currentProduct.name}
                fill
                objectFit="cover"
                 className="transition-opacity duration-500 ease-in-out"
                />
            </div>
        )}
         <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <CardTitle className="text-3xl font-bold text-white mb-2">{currentProduct.name}</CardTitle>
            {price && <p className="text-xl text-white">{price}DZD</p>}
         </CardContent>
        </Card>
    )
}