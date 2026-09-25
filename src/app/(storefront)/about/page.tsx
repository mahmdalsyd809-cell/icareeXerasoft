import Image from "next/image";

export const metadata = {
  title: "La Maison | L'Élixir Noir",
  description: "Discover the heritage and craftsmanship behind L'Élixir Noir.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=2000&auto=format&fit=crop"
            alt="Perfume craftsmanship"
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-5 max-w-4xl mt-20">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-6">
            La Maison
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl mb-6 leading-tight text-on-surface">
            The Heritage of <br /> L&apos;Élixir Noir
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-5 md:px-10 max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-3xl mb-6 text-on-surface">Mastery in Every Drop</h2>
            <p className="text-outline leading-relaxed mb-6">
              Founded on the principles of haute parfumerie, L&apos;Élixir Noir represents the pinnacle of olfactory craftsmanship. We travel the globe to source the rarest, most exquisite raw materials, transforming them into timeless fragrances.
            </p>
            <p className="text-outline leading-relaxed">
              Every bottle is a testament to our dedication to the art of scent. From the first sketch of the flacon to the final drop of pure perfume, our process is completely bespoke, ensuring that each creation is a masterpiece.
            </p>
          </div>
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-outline/10">
            <Image 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop"
              alt="Perfume bottle detail"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-32 text-center max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl mb-6 text-on-surface">Our Philosophy</h2>
          <p className="text-outline leading-relaxed mb-10">
            We believe that a fragrance is more than a scent; it is an invisible garment that defines your presence. Our creations are designed for connoisseurs who appreciate complexity, depth, and the luxury of time.
          </p>
          <div className="w-16 h-[1px] bg-primary mx-auto"></div>
        </div>
      </section>
    </div>
  );
}
