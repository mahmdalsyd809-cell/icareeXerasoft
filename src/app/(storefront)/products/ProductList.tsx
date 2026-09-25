"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  category: string;
  scentFamily: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
}

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const searchParams = useSearchParams();
  
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<number>(1000);

  useEffect(() => {
    const scent = searchParams.get("scent");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (scent) setSelectedFamily(scent);
  }, [searchParams]);

  const scentFamilies = ["All", ...Array.from(new Set(initialProducts.map(p => p.scentFamily)))];

  const filteredAndSorted = useMemo(() => {
    let result = initialProducts;

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    }

    if (selectedFamily !== "All") {
      result = result.filter(p => p.scentFamily === selectedFamily);
    }

    result = result.filter(p => p.price <= priceRange);

    result.sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return 0; 
    });

    return result;
  }, [initialProducts, selectedFamily, sortOrder, priceRange, searchParams]);

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-on-surface border-b border-surface-container pb-4 mb-4">
            Scent Family
          </h3>
          <ul className="space-y-3">
            {scentFamilies.map(family => (
              <li key={family}>
                <button
                  onClick={() => setSelectedFamily(family)}
                  className={`text-sm transition-colors ${
                    selectedFamily === family ? "text-primary" : "text-outline hover:text-on-surface"
                  }`}
                >
                  {family}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-on-surface border-b border-surface-container pb-4 mb-4">
            Max Price: ${priceRange}
          </h3>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 border-b border-surface-container pb-4">
          <p className="text-outline text-sm">{filteredAndSorted.length} Results</p>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent text-sm text-on-surface border-none outline-none focus:ring-0 cursor-pointer"
          >
            <option value="newest" className="bg-surface">Newest Additions</option>
            <option value="price-asc" className="bg-surface">Price: Low to High</option>
            <option value="price-desc" className="bg-surface">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSorted.map((product) => (
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
        
        {filteredAndSorted.length === 0 && (
          <div className="text-center py-24 text-outline font-playfair text-xl">
            No compositions match your selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}
