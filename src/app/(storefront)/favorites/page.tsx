"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const { items } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] px-5 md:px-10 py-16 max-w-[1440px] mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">
          Your Curated Collection
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl text-on-surface">
          Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-outline" />
          </div>
          <h2 className="font-playfair text-2xl text-on-surface mb-4">Your wishlist is empty</h2>
          <p className="text-outline max-w-md mx-auto mb-10">
            You haven&apos;t saved any fragrances yet. Explore our collections to find your perfect bespoke scent.
          </p>
          <Link 
            href="/products"
            className="bg-primary text-background font-semibold uppercase tracking-[0.2em] text-sm px-10 py-4 rounded-full hover:bg-primary-container transition-all"
          >
            Discover Fragrances
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
