"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, category, price, imageUrl }: ProductCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to PDP
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name, category, price, imageUrl });
    }
  };

  return (
    <Link href={`/products/${id}`} className="group block relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container rounded-none border border-outline/10 group-hover:border-primary/30 transition-colors duration-500">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-md text-on-surface hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 md:opacity-0 md:group-hover:opacity-100"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${favorited ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
      
      <div className="pt-5 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary">{category}</p>
        <h3 className="font-playfair text-lg text-on-surface group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-outline text-sm">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
