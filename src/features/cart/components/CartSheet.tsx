"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner"; 

import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from "./CartItem";

export function CartSheet() {
  const { items, getCartTotal, getItemCount } = useCartStore();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false); // Controls sheet visibility
  const router = useRouter();
  
  const itemCount = getItemCount();

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please sign in to complete your order.");
      setOpen(false); // Close the cart sheet
      // Redirect to login, but tell it to come back to checkout afterwards
      router.push("/login?redirect=/checkout");
      return;
    }

    setOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-400 hover:text-blue-600">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-950 animate-in zoom-in">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
        <SheetHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <SheetTitle className="text-xl font-bold flex items-center gap-2">
            Your Cart <span className="text-sm font-normal text-slate-500">({itemCount} items)</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4 -mr-4 pr-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-2">
                <ShoppingBag className="h-8 w-8 opacity-40" />
              </div>
              <p>Your cart is currently empty.</p>
              <Button variant="outline" className="mt-4" onClick={() => setOpen(false)}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-0">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
            <div className="flex items-center justify-between font-medium text-sm text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-xl text-slate-900 dark:text-white">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <p className="text-xs text-center text-slate-400">
              Shipping and taxes calculated at checkout.
            </p>
            
            {/* Logic-based button instead of direct Link */}
            <Button 
              size="lg" 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}