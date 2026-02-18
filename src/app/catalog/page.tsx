"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";

export default function CatalogPage() {
    return (
        <main className="min-h-screen text-white bg-black selection:bg-white/20">
            <Navbar />
            <CartSidebar />

            {/* Header */}
            <section className="relative pt-48 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.3em" }}
                        className="text-[10px] uppercase font-bold text-white/30 mb-6 block tracking-[0.5em]"
                    >
                        Masterpiece Series
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black italic tracking-tighter silver-text mb-8 uppercase"
                    >
                        Collection
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light tracking-wide uppercase"
                    >
                        Curation of the world's most <span className="text-white">advanced</span> automotive recording instruments.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="container mx-auto px-6 pb-40">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="border-t border-white/5 py-24 bg-black relative">
                <div className="absolute inset-0 noise opacity-20" />
                <div className="container px-6 text-center text-white/20 relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold">© 2026 Inspector Korea — All Rights Secured.</p>
                </div>
            </footer>
        </main>
    );
}
