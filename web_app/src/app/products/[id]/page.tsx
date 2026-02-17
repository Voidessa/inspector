import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ShoppingCart, Check, Shield } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductPageProps {
    params: {
        id: string;
    };
}

// Generate static params for all products
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: ProductPageProps) {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery Placeholder */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 aspect-square flex items-center justify-center p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
                        <span className="text-slate-600 text-lg z-10">[ Product Image: {product.name} ]</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-blue-400 font-medium text-lg">{product.category}</p>
                        </div>

                        <div className="text-3xl font-bold text-white">
                            ${product.price.toLocaleString()}
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                            <div className="flex items-center space-x-3 text-sm text-slate-300">
                                <Check className="h-5 w-5 text-green-500" />
                                <span>In Stock & Ready to Ship</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-slate-300">
                                <Shield className="h-5 w-5 text-blue-500" />
                                <span>2 Year Official Warranty</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800">
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
