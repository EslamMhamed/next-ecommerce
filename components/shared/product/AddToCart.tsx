"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Cart, CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AddToCart({ item, cart }: { cart?: Cart; item: CartItem }) {
  const router = useRouter();

  async function handleAddToCart() {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast("Item don't add", {
        description: res.message,
      });
      return;
    }

    //Handel success add to cart
    toast("", {
      description: res.message,
      action: {
        label: "Go To Cart ",
        onClick: () => router.push("/cart"),
      },
    });
  }

  async function handleRemoveFromCart(){
    const res = await removeItemFromCart(item.productId)

    toast(res.message)

    return 
  }

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className="mt-3">
      <Button variant="outline" type="button" onClick={handleRemoveFromCart} >
        <Minus className="w-4 h-4" />
      </Button>
        <span className="px-2">{existItem.qty}</span>
      <Button variant="outline" type="button" onClick={handleAddToCart} >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full mt-3" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  )

}
export default AddToCart;
