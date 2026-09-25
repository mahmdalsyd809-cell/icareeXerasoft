import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { ProductCard } from "@/components/ProductCard";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=2000&auto=format&fit=crop"
          alt="Hero Parfum"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="relative z-10 text-center px-5 max-w-3xl mt-16">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            L&apos;Élixir Noir Collection
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight text-on-surface">
            The Art of <br /> Bespoke Olfaction
          </h1>
          <Link
            href="/products"
            className="inline-block bg-primary text-background uppercase tracking-[0.2em] text-sm font-semibold py-4 px-10 rounded-full hover:bg-primary-container transition-all duration-300"
          >
            Discover Collection
          </Link>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-24 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl text-on-surface">Curated Extraits</h2>
            <p className="text-outline mt-3">Explore our most sought-after compositions.</p>
          </div>
          <Link href="/products" className="hidden md:inline-block text-primary uppercase tracking-[0.2em] text-xs font-semibold hover:text-primary-container transition-colors border-b border-primary pb-1">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/products" className="inline-block text-primary uppercase tracking-[0.2em] text-xs font-semibold hover:text-primary-container transition-colors border-b border-primary pb-1">
            View All Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
