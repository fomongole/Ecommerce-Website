import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, Shield, Truck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/features/products/components/AddToCartButton";
import { Product } from "@/types";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return null;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} | Enterprise Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const mainImage = product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-slate-900 dark:text-slate-50">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Client Component for Interactive Buttons */}
            <div className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-8">
              <AddToCartButton product={product} />
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
