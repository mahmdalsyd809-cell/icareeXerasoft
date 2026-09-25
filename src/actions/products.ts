"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function searchProducts(query: string) {
  if (!query || query.length < 2) return [];
  
  try {
    const products = await prisma.product.findMany({
      where: {
        name: { 
          contains: query,
        }
      },
      take: 6,
      select: { 
        id: true, 
        name: true, 
        imageUrl: true, 
        price: true,
        category: true
      }
    });
    
    return products;
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
