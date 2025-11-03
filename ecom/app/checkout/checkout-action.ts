"use server"
import { CartItem } from "@/store/cart-store";
import { chargilyClient } from "@/lib/chargily"; 
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  try {
    const itemsJson = formData.get("items") as string;
    const items: CartItem[] = JSON.parse(itemsJson);

    const checkoutItems = items.map((item: CartItem) => ({
      price: item.price_id, 
      quantity: item.quantity,
    }));


    const checkout = await chargilyClient.createCheckout({
      items: checkoutItems,
      payment_method: 'edahabia', 
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      locale: 'en', 
      pass_fees_to_customer: false, 
      metadata: {
        order_date: new Date().toISOString(),
      },
    });

    console.log('Checkout response:', checkout);

    redirect(checkout.checkout_url);
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error; 
    }
    
    console.error("Error creating checkout:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error("Failed to create checkout session");
  }
}