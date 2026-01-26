"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="flex gap-4">
      <Button 
        size="lg" 
        className="flex-1 h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => addItem(product)}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="h-14 px-8 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Save
      </Button>
    </div>
  );
}