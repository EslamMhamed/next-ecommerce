"use server"

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { ca } from "zod/v4/locales";
import { cartItemSchema } from "../constants/validators";

  export async function addItemToCart(item:CartItem) {
    try {
      //Check for cart cookie
      const sessionCartId = (await cookies()).get("sessionCartId")?.value
      if(!sessionCartId) throw new Error("Cart session not found")

        // Get session and user ID
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) :  undefined

        // Get Cart
        const cart = await getMyCart()

        // Parse and validate item
        const item = cartItemSchema.parse(item)

        // Find product in database
        const product = await prisma.product.findFirst({
          where: {id: item.productId}
        })

        //Testing
        console.log({
          "sessionCartId" : sessionCartId,
          "User Id" : userId,
          "Item Re": item
        })
      
      return {
        success: true,
        message: "Item added to cart"
    }
    } catch (error) {
      return {
        success: false,
        message: formatError(error)
    }
    }
  }

  export async function getMyCart(){
    //Check for cart cookie
      const sessionCartId = (await cookies()).get("sessionCartId")?.value
      if(!sessionCartId) throw new Error("Cart session not found")

        // Get session and user ID
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) :  undefined

        // Get user cart from database
        const cart = await prisma.cart.findFirst({
          where: userId ? {userId} : {sessionCartId}
        })

        if(!cart) return undefined

        // Convert decimals and return
        return convertToPlainObject({
          ...cart,
          items: cart.items as CartItem[],
          itemsPrice: cart.itemsPrice.toString(),
          totalPrice: cart.totalPrice.toString(),
          shippingPrice: cart.shippingPrice.toString(),
          taxPrice: cart.taxPrice.toString(),
        })
  }