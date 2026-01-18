"use server"

import { LATEST_PRODUCTS_LIMIT } from "../constants"
import { prisma } from "../prisma"
import { convertToPlainObject } from "../utils"
// import { prisma } from "@/db/prisma"

// Get latest products
export async function getLatestProduts() {
    const data = await prisma.product.findMany({take: LATEST_PRODUCTS_LIMIT, orderBy: {createdAt: "desc"}})

    return convertToPlainObject(data) 
}

//Get single product by slug
export async function getProductBySlug(slug:string) {
    return prisma.product.findFirst({
        where: {slug}
    })
}