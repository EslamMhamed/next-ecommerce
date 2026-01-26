"use server";

import { revalidatePath } from "next/cache";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { prisma } from "../prisma";
import { convertToPlainObject, formatError } from "../utils";
import z from "zod";
import {
  insertProductschema,
  updateProductSchema,
} from "../constants/validators";
import { Prisma } from "../generated/prisma/client";

// Get latest products
export async function getLatestProduts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

//Get single product by slug
export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug },
  });
}

//Get single product by it's ID
export async function getProductById(id: string) {
  const data = prisma.product.findFirst({
    where: { id },
  });
  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
  query,
  limit = 8,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  //Query filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: { contains: query, mode: "insensitive" } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== "all" ? { category } : {};

  // Price filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // Rating filter 
  const ratingFilter = rating && rating !=="all" ? {
    rating:{gte: Number(rating)}
  } : {}

  const data = await prisma.product.findMany({
    where: { ...queryFilter, ...categoryFilter, ...priceFilter, ...ratingFilter },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const dataCount = await prisma.product.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({ where: { id } });
    if (!productExist) throw new Error("Product not found ");
    await prisma.product.delete({ where: { id } });
    revalidatePath(`/admin/products`);
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create a product
export async function createProduct(data: z.infer<typeof insertProductschema>) {
  try {
    const product = insertProductschema.parse(data);
    await prisma.product.create({ data: product });
    revalidatePath("/admin/prodcts");
    return { success: true, message: "Product create successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });
    if (!productExists) throw new Error("Product not found");
    await prisma.product.update({ where: { id: product.id }, data: product });
    revalidatePath("/admin/prodcts");
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(data);
}
