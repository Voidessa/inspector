"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";

export default function CatalogPage() {
    return (
        <main className="min-h-screen text-white bg-black selection:bg-blue-500/30">
            <Navbar />
            <CartSidebar />

            {/* Header */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent opacity-50 pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Collection</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                    >
                        Cutting-edge recording technology for every driver.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="border-t border-white/10 py-12 bg-black/50 backdrop-blur-xl">
                <div className="container px-4 text-center text-slate-600">
                    <p>© 2026 Inspector. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
