import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { RealTimeProductGrid } from "@/features/products/components/RealTimeProductGrid"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* 1. COMPACT HERO SECTION */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-300 mb-4">
                <Sparkles className="w-3 h-3 mr-2 text-blue-600" />
                Winter Drop Live
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
                Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Minimalism.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto lg:mx-0">
                Premium aesthetics for the modern creator. Sustainable materials, timeless design.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  Shop All Products
                </Button>
                <Button variant="outline" size="lg">
                  View Lookbook
                </Button>
              </div>
            </div>

            {/* Visual/Image Area */}
            <div className="flex-1 w-full max-w-md lg:max-w-full">
              <div className="aspect-[16/9] lg:aspect-[2/1] rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/20 dark:to-slate-900 border border-blue-100 dark:border-slate-800 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                <div className="text-center relative z-10 p-6">
                   <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-1">New Arrivals</p>
                   <p className="text-3xl font-black text-slate-900 dark:text-white">50% OFF</p>
                   <p className="text-sm text-slate-500">On selected items this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTS SECTION */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Drops</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Fresh from the studio.</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
              View Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Wrapped Grid in Suspense to handle useSearchParams() */}
          <Suspense fallback={<div className="h-96 flex items-center justify-center italic text-slate-400">Loading products...</div>}>
            <RealTimeProductGrid />
          </Suspense>
          
        </div>
      </section>
    </div>
  );
}