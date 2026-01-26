"use client";

import Link from "next/link";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        
        {/* Success Animation Circle */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
          <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Confirmed!</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Thank you for your purchase. We have sent a confirmation email to your inbox.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm">
          <p className="text-slate-500 dark:text-slate-400 mb-1">Order Number</p>
          <p className="font-mono font-medium text-slate-900 dark:text-white">ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          
          <Link href="/profile">
            <Button variant="ghost" className="w-full">
              View Order Details
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}