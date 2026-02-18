"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, Menu, X } from "lucide-react";

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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "glass-premium border-b border-white/5 py-3"
                : "bg-transparent py-8"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50 group">
                    <span className="text-xl font-black tracking-[-0.05em] text-white uppercase italic">
                        INSPECTOR
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-12">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/catalog">Catalog</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/support">Support</NavLink>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6">
                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-white/60 hover:text-white transition-all group"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-black text-black">
                                {itemCount}
                            </span>
                        )}
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
            <div className={`fixed inset-0 bg-black z-40 flex items-center justify-center transition-all duration-700 ease-[0.22,1,0.36,1] ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}`}>
                <div className="absolute inset-0 noise" />
                <div className="flex flex-col items-center space-y-12 text-3xl font-black italic tracking-tighter uppercase relative z-10">
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
        <Link href={href} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors relative group">
            {children}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
    );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link href={href} onClick={onClick} className="text-white hover:silver-text transition-all">
            {children}
        </Link>
    );
}
