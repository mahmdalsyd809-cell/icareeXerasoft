import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.product.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.inquiry.deleteMany()

  // Create Admin
  await prisma.admin.create({
    data: {
      email: 'admin@elixirnoir.com',
      passwordHash: 'placeholder_hash_for_now',
    },
  })

  // Create Sample Products
  const products = [
    {
      name: 'Oud Extrait',
      description: 'A deep, resinous pure oud extraction with hints of smoked rose and saffron.',
      price: 450.0,
      imageUrl: 'https://images.unsplash.com/photo-1595425970377-c9703bc48b37?q=80&w=800&auto=format&fit=crop',
      category: 'Perfume',
      scentFamily: 'Oud',
      sizeVariants: JSON.stringify([{ size: '50ml', price: 450 }, { size: '100ml', price: 700 }]),
      inStock: true,
    },
    {
      name: 'Taif Rose Absolute',
      description: 'The finest distillation of first-bloom Taif roses, wrapped in white musk.',
      price: 380.0,
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
      category: 'Perfume',
      scentFamily: 'Floral',
      sizeVariants: JSON.stringify([{ size: '50ml', price: 380 }, { size: '100ml', price: 600 }]),
      inStock: true,
    },
    {
      name: 'Ambergris Royale',
      description: 'A marine, amber warmth sourced from vintage, sun-cured ambergris.',
      price: 520.0,
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop',
      category: 'Perfume',
      scentFamily: 'Amber',
      sizeVariants: JSON.stringify([{ size: '50ml', price: 520 }]),
      inStock: true,
    },
    {
      name: 'Signature Discovery Set',
      description: 'A curated collection of our three most iconic extraits in travel vials.',
      price: 180.0,
      imageUrl: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=800&auto=format&fit=crop',
      category: 'Gift Set',
      scentFamily: 'Mixed',
      sizeVariants: JSON.stringify([{ size: '3 x 10ml', price: 180 }]),
      inStock: true,
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed completed successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
