import { cartItemSchema, insertCartSchema, insertProductschema, shippingAddressSchema } from "@/lib/constants/validators"
import z from "zod"

export type Product = z.infer<typeof insertProductschema> & {
    id : string,
    rating: string,
    createdAt : Date
}

export type Cart = z.infer<typeof insertCartSchema >

export type CartItem = z.infer<typeof cartItemSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>