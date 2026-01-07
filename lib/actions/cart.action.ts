"use server"

import { CartItem } from "@/types";

  export async function addItemToCart(item:CartItem) {
    return {
        success: false,
        message: "Item added to cart"
    }
  }