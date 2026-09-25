import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-container border-opacity-20 mt-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="font-playfair text-2xl text-on-surface mb-6 inline-block">
            L&apos;Élixir Noir
          </Link>
          <p className="text-outline text-sm leading-relaxed max-w-sm">
            Haute parfumerie and bespoke gifting for connoisseurs of niche olfactory art. 
            Designed to elevate the senses and capture fleeting moments in crystal.
          </p>
        </div>

        <div>
          <h4 className="text-on-surface font-semibold uppercase tracking-[0.2em] text-xs mb-6">Collections</h4>
          <ul className="space-y-4 text-sm text-outline">
            <li><Link href="/products" className="hover:text-primary transition-colors">Extrait de Parfum</Link></li>
            <li><Link href="/products?category=Gift Set" className="hover:text-primary transition-colors">Bespoke Gifts</Link></li>
            <li><Link href="/products?scent=Oud" className="hover:text-primary transition-colors">The Oud Reserve</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-on-surface font-semibold uppercase tracking-[0.2em] text-xs mb-6">Client Services</h4>
          <ul className="space-y-4 text-sm text-outline">
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Atelier</Link></li>
            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-surface-container border-opacity-10 py-6 text-center text-xs text-outline">
        <p>&copy; {new Date().getFullYear()} L&apos;Élixir Noir. All rights reserved.</p>
      </div>
    </footer>
  );
}
