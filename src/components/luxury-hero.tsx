"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function LuxuryHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section
            ref={containerRef}
            className="relative h-[120vh] w-full overflow-hidden bg-black"
        >
            {/* Cinematic Background */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/assets/hero-bg.png"
                    alt="Luxury Automotive Interior"
                    fill
                    priority
                    className="object-cover opacity-60 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                <div className="absolute inset-0 noise" />
            </motion.div>

            {/* Content */}
            <div className="container relative z-10 h-full flex flex-col items-center justify-center px-4">
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        animate={{ opacity: 1, letterSpacing: "0.2em" }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="text-xs md:text-sm uppercase font-light text-white/40 mb-6 block tracking-[0.5em]"
                    >
                        Engineering Perfection
                    </motion.span>

                    <h1 className="text-[14vw] md:text-[10vw] leading-none font-black tracking-tighter silver-text mb-8">
                        INSPECTOR
                    </h1>

                    <p className="text-lg md:text-2xl font-light text-white/50 max-w-2xl mx-auto tracking-wide mb-12">
                        The definitive standard in <span className="text-white">automotive intelligence</span>.
                        Besopke recording systems for the discerning driver.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <Button
                            size="lg"
                            className="group relative h-16 px-12 rounded-none bg-white text-black hover:bg-white transition-all overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center font-bold tracking-tight text-lg">
                                Explore Collection
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                            />
                        </Button>

                        <button className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-[0.2em] font-medium py-4 px-8 border border-white/10 hover:border-white/30 backdrop-blur-sm">
                            Watch Film
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-12 left-12 z-20 hidden md:block">
                <div className="space-y-4">
                    <div className="h-px w-32 bg-gradient-to-r from-white/20 to-transparent" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                        Model 2026 / Series S
                    </p>
                </div>
            </div>

            <div className="absolute bottom-12 right-12 z-20 text-right hidden md:block">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-2">
                    Technical Specification
                </p>
                <p className="text-xs text-white/60 font-mono">
                    4K HDR / 120FPS / CLOUD_SYNC_V4
                </p>
            </div>
        </section>
    );
}
