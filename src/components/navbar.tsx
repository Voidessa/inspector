"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Cart logic
    const toggleCart = useCartStore((state) => state.toggleCart);
    const items = useCartStore((state) => state.items);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "glass border-b border-white/5 py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50 group">
                    <span className="text-2xl font-black tracking-tighter text-white">
                        INSPECTOR
                        <span className="text-blue-500">.</span>
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/catalog">Catalog</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/support">Support</NavLink>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-white hover:text-blue-400 transition-colors group"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-[0_0_10px_#2563eb]">
                                {itemCount}
                            </span>
                        )}
                        <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 relative z-50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex items-center justify-center transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex flex-col items-center space-y-8 text-2xl font-light">
                    <MobileLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileLink>
                    <MobileLink href="/catalog" onClick={() => setMobileMenuOpen(false)}>Catalog</MobileLink>
                    <MobileLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileLink>
                    <MobileLink href="/support" onClick={() => setMobileMenuOpen(false)}>Support</MobileLink>
                </div>
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50" />
        </Link>
    );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link href={href} onClick={onClick} className="text-white hover:text-blue-400 transition-colors">
            {children}
        </Link>
    );
}
