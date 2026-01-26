"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
      {/* Product Image */}
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
      </div>

      {/* Info & Controls */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <h4 className="font-medium text-sm line-clamp-1 text-slate-900 dark:text-white">{item.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{item.category}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-sm text-slate-900 dark:text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-md border-slate-200 dark:border-slate-700" 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="text-xs w-6 text-center font-medium tabular-nums">{item.quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-md border-slate-200 dark:border-slate-700"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
            
            {/* Remove Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}