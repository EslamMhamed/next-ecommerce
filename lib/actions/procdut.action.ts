"use server"

import { LATEST_PRODUCTS_LIMIT } from "../constants"
import { prisma } from "../prisma"

// Get latest products
export async function getLatestProduts() {
    const data = await prisma.product.findMany({take: LATEST_PRODUCTS_LIMIT, orderBy: {createdAt: "desc"}})

    return data
}