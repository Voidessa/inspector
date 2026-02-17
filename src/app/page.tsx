"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { CartSidebar } from "@/components/cart-sidebar";
import { ArrowRight, ShieldCheck, Zap, Cloud, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="min-h-screen text-white overflow-x-hidden bg-black selection:bg-blue-500/30">
      <Navbar />
      <CartSidebar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-[12vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-2xl">
              INSPECTOR
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 flex flex-col items-center"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8" />
            <p className="text-xl md:text-3xl font-light text-slate-300 max-w-3xl mx-auto tracking-wide">
              Future-proof automotive recording systems. <br />
              <span className="text-blue-400 font-normal">Clarity. Protection. Intelligence.</span>
            </p>

            <div className="mt-12 flex gap-6">
              <Link href="/catalog">
                <Button size="lg" className="rounded-full px-10 py-8 text-xl bg-white text-black hover:bg-slate-200 transition-all font-bold tracking-tight">
                  View Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm tracking-widest uppercase"
        >
          Scroll to Explore
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-blue-900/10 border-y border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 mx-8 uppercase italic tracking-tighter">
              • Korean Quality • 4K HDR • Cloud Sync • AI Recognition
            </span>
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-12 h-12 text-blue-400" />}
              title="4K HDR Vision"
              desc="Crystal clear recording ensuring every detail is captured, day/night."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-purple-400" />}
              title="Signature AI"
              desc="Intelligent filtering of false radar alerts using advanced algorithms."
            />
            <FeatureCard
              icon={<Cloud className="w-12 h-12 text-cyan-400" />}
              title="Cloud Sync"
              desc="Instant backup and remote access to your footage from anywhere."
            />
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight">
            Ready to upgrade?
          </h2>
          <Link href="/catalog">
            <Button className="group relative px-12 py-8 text-2xl rounded-full overflow-hidden bg-transparent border-2 border-white/20 hover:border-white transition-all text-white">
              <span className="relative z-10 flex items-center">
                Open Catalog <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0 content-['']" />
              <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-bold flex items-center">
                Open Catalog <ArrowRight className="ml-4 w-6 h-6 translate-x-2" />
              </span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2026 Inspector. Engineered for perfection.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="p-10 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl group hover:bg-white/10 transition-colors"
    >
      <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 text-lg leading-relaxed">{desc}</p>
    </motion.div>
  )
}
