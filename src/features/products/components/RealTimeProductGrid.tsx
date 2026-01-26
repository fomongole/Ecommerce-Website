"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation"; // To handle search filtering

import { ProductCard } from "./ProductCard";
import { useProductStore } from "@/stores/useProductStore";

export function RealTimeProductGrid() {
  const { products, isLoading, fetchProducts } = useProductStore();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products locally if a search query exists
  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchQuery) || 
    product.category.toLowerCase().includes(searchQuery)
  );

  if (isLoading && products.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}