import { PrismaClient } from "@prisma/client";
import { ProductTable } from "./ProductTable";
import { Plus } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-outline/10 pb-6">
        <div>
          <h1 className="font-playfair text-3xl text-on-surface">Products</h1>
          <p className="text-outline text-sm mt-1">Manage your inventory, stock, and bespoke offerings.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-background px-6 py-3 rounded-full uppercase tracking-[0.1em] text-xs font-semibold flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <ProductTable initialProducts={products} />
    </div>
  );
}
