"use client"

import { Button } from "@/components/ui/button"
import { addItemToCart } from "@/lib/actions/cart.action"
import { CartItem } from "@/types"
import { useRouter } from "next/navigation"
import { toast, Toaster } from "sonner"

function AddToCart({item}: {item: CartItem}) {

    const router = useRouter()
    

    async function handleAddToCart(){
        const res = await addItemToCart(item)
        if(!res.success){
           toast("Item don't add",  {
          description: res.message,
        })
        }
        return
    }

    //Handel success add to cart
    toast("", {description: `${item.name} added to cart`, 
    action: {
            label: "Go To Cart ",
            onClick: () => router.push("/cart") 
          }},
       
    )
    
  return (
    <Button className="w-full" onClick={handleAddToCart} >Add To Cart</Button>
  )
}

export default AddToCart