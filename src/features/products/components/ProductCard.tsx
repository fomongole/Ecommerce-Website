"use client";

import Link from "next/link"; // <--- Imported Link
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
      
      {/* 1. We wrap the Image Section in a Link to make it clickable */}
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Quick Add Button */}
          {/* This button is INSIDE the link, so we must stop the click from navigating */}
          <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button 
              onClick={(e) => {
                e.preventDefault(); // Stops the Link from firing
                e.stopPropagation(); // Double safety to prevent bubbling
                addItem(product);
              }}
              size="icon" 
              className="rounded-full shadow-lg bg-white text-black hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Link>

      {/* Details Section */}
      <div className="p-4">
        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
          {product.category}
        </div>
        
        {/* We can also link the title if we want */}
        <Link href={`/products/${product.id}`} className="hover:underline decoration-blue-600 underline-offset-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 truncate">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-900 dark:text-slate-50">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}