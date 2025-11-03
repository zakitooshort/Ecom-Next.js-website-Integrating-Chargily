"use client"
import { useCartStore } from "@/store/cart-store";
import {Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { checkoutAction } from "./checkout-action";
export default function CheckoutPage(){
    const {items,removeItem,addItem,clearCart}= useCartStore();
    const total=items.reduce((acc,item)=>acc+item.price*item.quantity,0);
    
    if (total === 0 || items.length === 0){
        return (
            <div>
                <h1>Your Cart is Empty.</h1>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <Card className="max-w-md mx-auto mb-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {items.map((item,key)=>(
                            <li key={key} className="flex flex-col gap-2 border-b pb-2">
                             <div className="flex justify-between">
                              <span className="font-medium">{item.name}</span>
                              <span className="font-semibold">DZD{(item.price*item.quantity)}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={()=>removeItem(item.id)}>-</Button>
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <Button onClick={()=>addItem({...item,quantity:1})}>+</Button>
                             </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 border-t pt-2 text-lg font-semibold">
                        Total: ${(total)}
                    </div>
                </CardContent>

            </Card>
            <form action={checkoutAction} className="max-w-md mx-auto">
              <input type="hidden" name="items" value={JSON.stringify(items)} />
              <Button type="submit" variant="default" className="w-full">
                Proceed to Payment
              </Button>
              
            </form>
        </div>
    )
}