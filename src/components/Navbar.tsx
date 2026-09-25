"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const { setIsOpen, items: cartItems } = useCartStore();
  const { items: favItems } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavItems = favItems.length;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface/80 border-b border-surface-container border-opacity-10">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Toggle */}
        <div className="flex-1 md:hidden">
          <button className="text-on-surface hover:text-primary transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 gap-8 text-sm uppercase tracking-[0.2em] font-semibold text-outline">
          <Link href="/products" className="hover:text-primary transition-colors">Parfums</Link>
          <Link href="/products?category=Gift Set" className="hover:text-primary transition-colors">Gifts</Link>
          <Link href="/about" className="hover:text-primary transition-colors">Maison</Link>
        </nav>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="font-playfair text-2xl md:text-3xl text-on-surface hover:text-primary transition-colors tracking-wide">
            L&apos;Élixir Noir
          </Link>
        </div>

        {/* Actions */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
          <SearchBar />
          
          <Link 
            href="/favorites"
            className="text-on-surface hover:text-primary transition-colors relative"
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
            {mounted && totalFavItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalFavItems}
              </span>
            )}
          </Link>

          <button 
            className="text-on-surface hover:text-primary transition-colors relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {mounted && totalCartItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
        
      </div>
    </header>
  );
}
