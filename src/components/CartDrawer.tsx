"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getCartTotal();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface-container border-l border-outline/10 z-50 transform transition-transform duration-500 ease-in-out flex flex-col shadow-[-12px_0_48px_rgba(0,0,0,0.65)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-outline/10">
          <h2 className="font-playfair text-xl text-on-surface flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Atelier Cart
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-outline hover:text-primary transition-colors p-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-outline space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-playfair text-lg">Your cart is empty.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary text-sm uppercase tracking-[0.2em] hover:text-primary-container transition-colors"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative w-20 h-24 bg-surface rounded-sm border border-outline/10 overflow-hidden flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-playfair text-on-surface truncate">{item.name}</h3>
                  <p className="text-xs text-outline uppercase tracking-wider mt-1">{item.size}</p>
                  <p className="text-sm text-primary mt-2">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-outline/20 rounded-full">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 text-outline hover:text-primary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm text-on-surface">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-outline hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-outline/10 bg-surface">
            <div className="flex items-center justify-between mb-6 text-on-surface">
              <span className="text-outline">Subtotal</span>
              <span className="font-playfair text-xl">${total.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-primary hover:bg-primary-container text-background text-center py-4 rounded-full font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              Checkout via WhatsApp
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
