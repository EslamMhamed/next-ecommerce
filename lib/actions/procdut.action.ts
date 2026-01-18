"use server"

import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants"
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

// Get all products 
export async function getAllProducts({query, limit= PAGE_SIZE , page, category}: {query: string, limit?:number, page: number, category?: string}){
    const data = await prisma.product.findMany({
         take: limit , skip :(page -1 ) * limit 
    })

    const dataCount = await prisma.product.count()

    return {data, totalPages: Math.ceil(dataCount / limit)}
}