"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* Background Gradient / Image Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 z-10" />
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50" />
                {/* TODO: Add actual background image/video here */}
            </div>

            <div className="container relative z-20 flex flex-col items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Glowing Orb behind badge */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 animate-pulse"></div>
                    <div className="relative inline-flex items-center space-x-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-sm text-slate-200 mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                        <span className="tracking-wide uppercase text-xs font-semibold">Official Reseller & Importer</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        INSPECTOR
                    </h1>
                    {/* Reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-clip-text text-transparent pointer-events-none" aria-hidden="true">
                        INSPECTOR
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 font-light leading-relaxed"
                >
                    Premium automotive recording systems. <br className="hidden md:block" />
                    Ultimate protection and clarity for every journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Button
                        size="lg"
                        className="group relative cursor-pointer overflow-hidden rounded-full bg-blue-600/80 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/30 transition-all duration-300 px-8 py-6 text-lg"
                        onClick={() => {
                            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="relative z-10 flex items-center">
                            Explore Catalog
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                    </Button>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="glass border-white/10 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                        <ShieldCheck className="mr-2 h-5 w-5" />
                        Warranty Info
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
