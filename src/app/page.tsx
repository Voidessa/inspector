"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";
import { ArrowRight, Zap, Cloud, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuxuryHero } from "@/components/luxury-hero";

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden bg-black selection:bg-white/20">
      <Navbar />
      <CartSidebar />

      {/* Hero Section */}
      <LuxuryHero />

      {/* Marquee Section */}
      <section className="py-12 border-y border-white/5 overflow-hidden backdrop-blur-sm bg-white/[0.02]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent mx-12 uppercase italic tracking-tighter">
              • Pre-Order Now • 4K HDR Vision • Cloud Sync V4 • Signature AI
            </span>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-40 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              The Science of <span className="silver-text text-white">Clarity</span>
            </motion.h2>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Engineered with military-grade precision to ensure your journey is documented with absolute truth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-10 h-10 text-white" />}
              title="4K HDR Vision"
              desc="Crystal clear recording ensuring every detail is captured, day and night, with ultra-wide dynamic range."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-white" />}
              title="Signature AI"
              desc="Intelligent real-time filtering of radar alerts using our proprietary 2026 AI algorithms."
            />
            <FeatureCard
              icon={<Cloud className="w-10 h-10 text-white" />}
              title="Cloud Sync V4"
              desc="Instant biometric-secured backup and global remote access to your high-res footage."
            />
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-40 text-center relative overflow-hidden h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] blur-[100px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-9xl font-bold mb-16 tracking-tighter silver-text">
              Elevate Your <br /> Experience.
            </h2>
            <Link href="/catalog">
              <Button size="lg" className="h-20 px-16 text-xl rounded-none bg-white text-black hover:bg-neutral-200 transition-all font-bold tracking-tight">
                Secure Yours <ArrowRight className="ml-4 w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-24 bg-black relative">
        <div className="absolute inset-0 noise" />
        <div className="container px-6 flex flex-col md:flex-row justify-between items-start text-white/30 text-xs font-medium uppercase tracking-[0.2em] relative z-10">
          <div className="mb-12 md:mb-0">
            <h3 className="text-white text-lg font-black tracking-tighter mb-6">INSPECTOR</h3>
            <p>© 2026 Inspector KOREA. <br /> Developed with pride.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-white/60">Product</span>
              <Link href="#" className="hover:text-white transition-colors">Series S</Link>
              <Link href="#" className="hover:text-white transition-colors">Catalog</Link>
              <Link href="#" className="hover:text-white transition-colors">Tech</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white/60">Legal</span>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white/60">Connect</span>
              <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-white transition-colors">Email</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="p-12 glass-premium group transition-all duration-500"
    >
      <div className="mb-8 p-5 bg-white/5 rounded-full w-fit group-hover:bg-white group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-4 silver-text">{title}</h3>
      <p className="text-white/40 text-lg leading-relaxed font-light">{desc}</p>
    </motion.div>
  )
}
