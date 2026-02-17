import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { CartSidebar } from "@/components/cart-sidebar";
import { products } from "@/lib/products";
import { ShoppingCart } from "lucide-react"; // Import icon for floating button if needed, though sidebar usually handles it via store state/trigger

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      {/* Global Cart Sidebar (always present) */}
      <CartSidebar />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Catalog Section */}
      <section id="catalog" className="container px-4 py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
            Catalog
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Discover our range of premium automotive safety devices.
            Engineered for reliability and crystal-clear recording.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer (Placeholder) */}
      <footer className="border-t border-slate-900 py-12 bg-slate-950">
        <div className="container px-4 text-center text-slate-600">
          <p>© 2026 Inspector. All rights reserved.</p>
          <p className="text-sm mt-2">Premium Automotive Electronics</p>
        </div>
      </footer>
    </main>
  );
}
