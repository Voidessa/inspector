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
        // Integrated with existing Telegram API
        try {
            const response = await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, total: total() })
            });

            const data = await response.json();
            if (data.success) {
                clearCart();
                toggleCart();
                alert("Order secured. Expect a contact shortly.");
            } else {
                alert("Transmission failed. Please retry.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-black border-l border-white/5 z-[70] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]"
                    >
                        <div className="absolute inset-0 noise z-0" />

                        <div className="relative z-10 flex items-center justify-between p-8 border-b border-white/5">
                            <h2 className="text-xl font-black italic tracking-tighter uppercase">Vault / Your Selection</h2>
                            <button onClick={toggleCart} className="hover:rotate-90 transition-transform duration-500 text-white/40 hover:text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="relative z-10 flex-1 overflow-y-auto p-8 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <p className="text-white/20 font-light italic tracking-widest uppercase text-xs">No items curated yet.</p>
                                    <button onClick={toggleCart} className="mt-8 text-white text-xs font-black uppercase tracking-[0.3em] border-b border-white/20 hover:border-white transition-all pb-1">
                                        Back to Gallery
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-6 items-center bg-white/[0.02] p-6 border border-white/5 group"
                                    >
                                        <div className="h-20 w-20 bg-white/5 rounded-none flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                                            <div className="w-full h-full noise" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-black uppercase tracking-tight">{item.name}</h4>
                                            <p className="text-xs font-light text-white/40 mt-1 uppercase tracking-widest">
                                                CURRENCY_USD {item.price.toLocaleString()} — QTY_{item.quantity}
                                            </p>
                                        </div>
                                        <button
                                            className="text-white/20 hover:text-white transition-colors"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="relative z-10 p-8 border-t border-white/5 bg-white/[0.01]">
                                <div className="flex justify-between items-end mb-10">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Total Investment</span>
                                    <span className="text-4xl font-black italic silver-text">
                                        ${total().toLocaleString()}
                                    </span>
                                </div>
                                <Button
                                    className="w-full h-20 bg-white text-black hover:bg-neutral-200 rounded-none font-black uppercase tracking-[0.2em] text-sm group overflow-hidden relative"
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                >
                                    <span className="relative z-10 flex items-center">
                                        {isSubmitting ? "PROCESSING" : "SECURE CHECKOUT"}
                                        {!isSubmitting && <Send className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />}
                                    </span>
                                </Button>
                                <p className="text-[9px] text-center text-white/20 mt-6 tracking-widest uppercase leading-loose">
                                    Bespoke logistics handled via encrypted <br /> Telegram channel for maximum privacy.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
