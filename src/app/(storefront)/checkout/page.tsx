"use client";

import { useForm } from "react-hook-form";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CheckoutFormData {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (items.length === 0) {
      router.push("/products");
    }
  }, [items, router]);

  if (!mounted || items.length === 0) return null;

  const total = getCartTotal();

  const onSubmit = (data: CheckoutFormData) => {
    // Format the WhatsApp message
    let message = `*New Order from ${data.fullName}*\n\n`;
    message += `*Items:*\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.size}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total:* $${total.toFixed(2)}\n\n`;
    message += `*Shipping Details:*\n`;
    message += `Name: ${data.fullName}\n`;
    message += `Phone: ${data.phone}\n`;
    message += `Address: ${data.address}\n`;
    if (data.notes) {
      message += `Notes: ${data.notes}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    // Replace with a real WhatsApp business number, for now use a placeholder
    const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
    
    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, "_blank");
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16">
      <div className="mb-12">
        <h1 className="font-playfair text-4xl text-on-surface mb-2">Bespoke Checkout</h1>
        <p className="text-outline">Complete your atelier order via our Concierge.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Full Name</label>
              <input 
                {...register("fullName", { required: "Name is required" })}
                className="w-full bg-surface-container border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="Jean Dupont"
              />
              {errors.fullName && <p className="text-error text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Phone (WhatsApp)</label>
              <input 
                {...register("phone", { required: "Phone is required" })}
                className="w-full bg-surface-container border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="+33 6 12 34 56 78"
              />
              {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Delivery Address</label>
              <textarea 
                {...register("address", { required: "Address is required" })}
                rows={3}
                className="w-full bg-surface-container border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="123 Rue de Rivoli, 75001 Paris, France"
              />
              {errors.address && <p className="text-error text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-outline mb-2">Special Requests / Gift Notes</label>
              <textarea 
                {...register("notes")}
                rows={2}
                className="w-full bg-surface-container border border-outline/20 rounded-none px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Optional engraving or gift card message..."
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-background font-semibold uppercase tracking-[0.2em] text-sm py-4 rounded-full hover:bg-primary-container hover:shadow-[0_0_24px_rgba(229,195,101,0.4)] transition-all duration-300 mt-4"
            >
              Confirm via WhatsApp
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-surface-container-high border border-outline/10 p-6">
            <h3 className="font-playfair text-2xl text-on-surface mb-6 border-b border-outline/10 pb-4">Order Summary</h3>
            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-surface flex-shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-on-surface truncate font-playfair">{item.name}</h4>
                    <p className="text-xs text-outline tracking-wider mt-1">{item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-outline">Qty: {item.quantity}</span>
                      <span className="text-sm text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-outline/10 mt-6 pt-6">
              <div className="flex justify-between text-on-surface text-lg">
                <span className="font-playfair">Total</span>
                <span className="font-playfair text-primary text-2xl">${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-outline mt-4 text-center">Shipping calculated upon confirmation with our Concierge.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
