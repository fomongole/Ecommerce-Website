"use client";

import { Suspense } from "react"; // Required for useSearchParams
import { RealTimeProductGrid } from "@/features/products/components/RealTimeProductGrid";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shop Collection</h1>
            <p className="text-slate-500 dark:text-slate-400">Explore our premium selection.</p>
        </div>
        {/* Suspense is needed when using useSearchParams in Client Components in Next.js 15 */}
        <Suspense fallback={<div>Loading...</div>}>
          <RealTimeProductGrid />
        </Suspense>
      </div>
    </div>
  );
}