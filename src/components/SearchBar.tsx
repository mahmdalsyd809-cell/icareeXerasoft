"use client";

import { useState, useEffect, useTransition } from "react";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/actions/products";
import Link from "next/link";
import Image from "next/image";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      startTransition(async () => {
        const res = await searchProducts(query);
        setResults(res);
      });
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="relative flex items-center">
      <Search className="w-4 h-4 text-outline absolute left-3" />
      <input 
        type="text" 
        placeholder="Search..."
        className="bg-surface border border-outline/10 rounded-full py-2 pl-9 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary w-32 sm:w-48 lg:w-64 transition-all"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {query && (
        <button 
          onClick={() => setQuery("")}
          className="absolute right-3 text-outline hover:text-on-surface"
        >
          <X className="w-3 h-3" />
        </button>
      )}

      {isFocused && query.length >= 2 && (
        <div className="absolute top-full right-0 mt-4 w-[90vw] sm:w-96 max-w-md bg-surface-container border border-outline/10 rounded-xl overflow-hidden shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2">
          {isPending ? (
            <div className="p-6 text-center text-outline text-sm">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto">
              {results.map(product => (
                <li key={product.id} className="border-b border-outline/10 last:border-0">
                  <Link 
                    href={`/products/${product.id}`}
                    onClick={() => { setQuery(""); setIsFocused(false); }}
                    className="flex items-center gap-4 p-4 hover:bg-surface-container-high transition-colors group"
                  >
                    <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-outline mb-1">{product.category}</p>
                      <h4 className="font-playfair text-on-surface text-sm group-hover:text-primary transition-colors">{product.name}</h4>
                      <p className="text-primary text-xs mt-1">${product.price}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-outline text-sm">No products found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
}
