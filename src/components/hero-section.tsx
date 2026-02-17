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
                >
                    <div className="inline-flex items-center space-x-2 border border-slate-800 bg-slate-900/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-slate-300 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span>Official Reseller & Importer</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                >
                    INSPECTOR
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8"
                >
                    Premium automotive recording systems. <br className="hidden md:block" />
                    Ultimate protection and clarity for every journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button
                        size="lg"
                        variant="premium"
                        className="group cursor-pointer"
                        onClick={() => {
                            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Explore Catalog
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Warranty Info
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
