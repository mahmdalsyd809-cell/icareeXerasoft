"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toggleProductStock, deleteProduct } from "@/actions/admin";
import { Edit2, Trash2, Box } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export function ProductTable({ initialProducts }: { initialProducts: Product[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface-container rounded-lg border border-outline/10 overflow-x-auto">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-surface-container-high text-xs uppercase tracking-wider text-outline">
          <tr>
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline/10">
          {initialProducts.map((product) => (
            <tr key={product.id} className="hover:bg-surface-container-high/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-16 bg-surface rounded-sm border border-outline/10 overflow-hidden flex-shrink-0">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="font-playfair text-on-surface">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-outline">{product.category}</td>
              <td className="px-6 py-4 text-sm text-on-surface">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                <button
                  disabled={isPending}
                  onClick={() => startTransition(async () => { await toggleProductStock(product.id, product.inStock); })}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    product.inStock 
                      ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20" 
                      : "bg-surface text-outline border border-outline/20 hover:bg-surface-container-high"
                  }`}
                >
                  <Box className="w-3 h-3" />
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button className="p-2 text-outline hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    disabled={isPending}
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this product?")) {
                        startTransition(async () => { await deleteProduct(product.id); });
                      }
                    }}
                    className="p-2 text-outline hover:text-error transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {initialProducts.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-outline">
                No products found in the atelier.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
