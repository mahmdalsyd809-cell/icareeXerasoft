import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetails";

const prisma = new PrismaClient();

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  // Parse the size variants
  const variants = JSON.parse(product.sizeVariants) as { size: string; price: number }[];

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16">
      <ProductDetails product={product} variants={variants} />
    </div>
  );
}
