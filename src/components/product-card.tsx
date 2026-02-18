"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <Card className="glass-premium border-0 overflow-hidden text-white relative z-10 h-full flex flex-col bg-white/[0.02]">
                <CardContent className="p-0 flex-grow relative">
                    <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-[4/5] w-full flex items-center justify-center p-8 cursor-pointer overflow-hidden bg-black/40">
                            {/* Inner glow and noise */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                            <div className="absolute inset-0 noise opacity-20" />

                            <div className="relative w-full h-full transition-transform duration-1000 group-hover:scale-110 flex items-center justify-center">
                                <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col items-center justify-center text-white/20 backdrop-blur-sm relative">
                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-2">Technical Draft</span>
                                    <span className="text-[8px] font-mono opacity-50">#SERIES_{product.id.toUpperCase()}</span>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        className="absolute top-4 right-4"
                                    >
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="p-8">
                        <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-black italic tracking-tighter text-white mb-2 hover:silver-text transition-all cursor-pointer uppercase">{product.name}</h3>
                        </Link>
                        <p className="text-xs text-white/40 line-clamp-2 mb-8 font-light leading-loose tracking-wide uppercase">{product.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-2xl font-black italic silver-text tracking-tighter">
                                ${product.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 mt-auto">
                    <Button
                        className="w-full h-14 bg-white text-black hover:bg-neutral-200 rounded-none font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group-active:scale-95"
                        onClick={(e) => {
                            e.preventDefault();
                            addItem(product);
                        }}
                    >
                        <ShoppingCart className="mr-3 h-4 w-4" />
                        Acquire Piece
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
