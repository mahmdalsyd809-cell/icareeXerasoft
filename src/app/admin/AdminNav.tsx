"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, MessageSquare, LogOut, Menu, X } from "lucide-react";

export function AdminNav({ logoutAction }: { logoutAction: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-outline/10 bg-surface-container-low">
        <div>
          <h2 className="font-playfair text-xl text-on-surface">L&apos;Élixir Noir</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary">Admin Portal</p>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-on-surface p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar / Mobile Menu */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-surface-container-low border-r border-outline/10 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="hidden md:block p-6 border-b border-outline/10">
          <h2 className="font-playfair text-2xl text-on-surface">L&apos;Élixir Noir</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mt-2">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4 md:mt-0">
          <Link 
            href="/admin/products" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link 
            href="/admin/inquiries" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Inquiries
          </Link>
        </nav>
        
        <div className="p-4 border-t border-outline/10">
          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-error hover:bg-error/10 transition-colors text-left">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
