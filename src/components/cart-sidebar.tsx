"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { X, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CartSidebar() {
    const { items, isOpen, toggleCart, removeItem, total, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckout = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items,
                    total: total()
                })
            });

            const data = await response.json();

            if (data.success) {
                alert(`Order sent successfully! Order ID: ${data.orderId}`);
                clearCart();
                toggleCart();
            } else {
                alert("Failed to send order. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Check console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-slate-950 border-l border-slate-800 z-50 shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">Your Cart</h2>
                            <Button variant="ghost" size="icon" onClick={toggleCart}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center text-slate-500 mt-10">
                                    <p>Your cart is empty.</p>
                                    <Button variant="link" onClick={toggleCart} className="mt-4 text-blue-400">
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                        <div className="h-16 w-16 bg-slate-800 rounded-md flex items-center justify-center shrink-0">
                                            {/* Placeholder Image */}
                                            <span className="text-xs text-slate-600">Img</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-white">{item.name}</h4>
                                            <p className="text-sm text-slate-400">
                                                ${item.price.toLocaleString()} x {item.quantity}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <SheetContent className="glass bg-slate-900/80 border-l border-white/10 text-white w-full sm:max-w-md">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-400">Total</span>
                                    <span className="text-2xl font-bold text-white">
                                        ${total().toLocaleString()}
                                    </span>
                                </div>
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 text-lg"
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Processing..."
                                    ) : (
                                        <>
                                            Checkout with Telegram <Send className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-slate-500 mt-4">
                                    Order details will be sent directly to our secure Telegram channel.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
