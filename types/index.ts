import { insertProductschema } from "@/lib/constants/validators"
import z from "zod"

export type Product = z.infer<typeof insertProductschema> & {
    id : string,
    rating: string,
    createdAt : Date
}