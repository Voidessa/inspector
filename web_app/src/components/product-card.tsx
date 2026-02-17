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
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="bg-slate-900 border-slate-800 overflow-hidden group">
                <CardContent className="p-0">
                    <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center p-6 cursor-pointer">
                            <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                                {/* 
                  Using a placeholder div for now, but configured for Next.js Image.
                  In a real app, strict height/width or fill is needed.
               */}
                                <div className="w-full h-full bg-slate-800 rounded-md flex items-center justify-center text-slate-600">
                                    [Product Image]
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="p-6">
                        <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-blue-400">
                                ${product.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button
                        className="w-full bg-slate-800 hover:bg-blue-600 text-white transition-colors"
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
