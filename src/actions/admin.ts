"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function toggleProductStock(id: string, currentStockStatus: boolean) {
  try {
    await prisma.product.update({
      where: { id },
      data: { inStock: !currentStockStatus },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update stock status." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete product." };
  }
}
