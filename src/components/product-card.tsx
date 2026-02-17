"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
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
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative"
        >
            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <Card className="glass-card border-0 overflow-hidden text-white relative z-10 h-full flex flex-col">
                <CardContent className="p-0 flex-grow relative">
                    <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-square w-full flex items-center justify-center p-8 cursor-pointer overflow-hidden">
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-50" />

                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110 flex items-center justify-center">
                                {/* 
                                  Using a placeholder div for now. 
                                  In production, replace with actual Image component.
                                */}
                                <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-slate-400 backdrop-blur-sm">
                                    <span className="text-sm font-light tracking-widest uppercase">Product Image</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="p-6">
                        <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer tracking-wide">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4 font-light leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                ${product.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 mt-auto">
                    <Button
                        className="w-full liquid-button hover:bg-blue-600/20 text-white transition-all duration-300 border-white/10 group-active:scale-95"
                        onClick={() => addItem(product)}
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
