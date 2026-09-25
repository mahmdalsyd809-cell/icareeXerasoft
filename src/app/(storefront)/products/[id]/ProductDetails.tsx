"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  inStock: boolean;
}

interface Variant {
  size: string;
  price: number;
}

interface ProductDetailsProps {
  product: Product;
  variants: Variant[];
}

export function ProductDetails({ product, variants }: ProductDetailsProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const { addItem, setIsOpen } = useCartStore();
  
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(product.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(product.id);
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        category: product.category,
        price: variants[0].price,
        imageUrl: product.imageUrl,
      });
    }
  };

  const selectedVariant = variants[selectedVariantIndex];
  const finalPrice = selectedVariant.price + (giftWrap ? 25 : 0);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: selectedVariant.price, // Gift wrap could be added as a separate line item or merged
      size: selectedVariant.size + (giftWrap ? " (+ Gift Wrap)" : ""),
      imageUrl: product.imageUrl,
    });
    setIsOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
      {/* Image Gallery (Simplified for now) */}
      <div className="relative aspect-[3/4] w-full bg-surface-container rounded-none border border-outline/10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <div className="mb-8">
          <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            {product.category}
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-on-surface mb-6">
            {product.name}
          </h1>
          <p className="text-outline text-lg leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Variants */}
        <div className="mb-10">
          <h3 className="text-xs uppercase tracking-[0.2em] text-on-surface mb-4">Select Volume</h3>
          <div className="flex flex-wrap gap-4">
            {variants.map((variant, idx) => (
              <button
                key={variant.size}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`py-3 px-6 rounded-full border text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedVariantIndex === idx
                    ? "border-primary text-primary bg-primary/5"
                    : "border-outline/20 text-outline hover:border-outline/50"
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Wrap Toggle */}
        <div className="mb-12 flex items-center gap-4">
          <button
            onClick={() => setGiftWrap(!giftWrap)}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
              giftWrap ? "bg-primary" : "bg-surface-container-high"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform duration-300 ${
                giftWrap ? "left-7" : "left-1"
              }`}
            />
          </button>
          <div>
            <p className="text-sm text-on-surface font-semibold">Bespoke Gift Wrapping (+$25)</p>
            <p className="text-xs text-outline mt-1">Hand-tied velvet ribbon and wax-sealed card.</p>
          </div>
        </div>

        {/* Action */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <p className="font-playfair text-3xl text-on-surface w-full mb-2">
            ${finalPrice.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 min-w-[200px] uppercase tracking-[0.2em] text-sm font-semibold py-5 rounded-full transition-all duration-300 ${
              product.inStock
                ? "bg-primary text-background hover:bg-primary-container hover:shadow-[0_0_24px_rgba(229,195,101,0.4)]"
                : "bg-surface-container-high text-outline cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Atelier Cart" : "Out of Stock"}
          </button>
          
          <button 
            onClick={toggleFavorite}
            className={`p-5 rounded-full border transition-all duration-300 ${
              favorited 
                ? "border-primary bg-primary/10 text-primary" 
                : "border-outline/20 bg-transparent text-outline hover:border-primary hover:text-primary"
            }`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorited ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
