import { PrismaClient } from "@prisma/client";
import { ProductList } from "./ProductList";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16">
      <div className="mb-12">
        <h1 className="font-playfair text-4xl md:text-5xl text-on-surface mb-4">
          The Collection
        </h1>
        <p className="text-outline max-w-2xl">
          Discover our complete portfolio of bespoke extraits, curated gift sets, and 
          limited edition olfactory art pieces.
        </p>
      </div>
      
      <ProductList initialProducts={products} />
    </div>
  );
}
