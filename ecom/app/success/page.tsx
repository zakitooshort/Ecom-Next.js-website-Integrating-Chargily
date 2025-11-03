"use client"
import Link from "next/link";
import {useEffect} from "react";
import { useCartStore } from "@/store/cart-store";

export default function SuccessPage(){
    const {clearCart}=useCartStore();
    useEffect(()=>{
        clearCart();
    },[clearCart]);

    return(
        <div>
            <h1>Payment successful!</h1>
            <p>Thank you for your purchase your order is being processed</p>
            <Link href={"/products"}> Continue shopping
            </Link>
        </div>
    )
}