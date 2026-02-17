"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <Button
            size="lg"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white text-lg px-8 py-6"
            onClick={() => addItem(product)}
        >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
        </Button>
    );
}
