import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Leather Backpack",
    description: "Hand-crafted from Italian vegetable-tanned leather. Features a dedicated 15-inch laptop sleeve and weather-resistant finish.",
    price: 129.99,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"],
    category: "Accessories",
    stock: 15,
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: "2",
    name: "Ceramic Coffee Set",
    description: "Artisan-made ceramic pour-over set with matte black finish. Includes dripper, carafe, and two mugs.",
    price: 85.00,
    // Swapped broken link for a working coffee set image
    images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800"],
    category: "Home",
    stock: 8,
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: "3",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium sound quality with 40-hour battery life and active noise cancellation. Memory foam earcups for all-day comfort.",
    price: 349.00,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"],
    category: "Electronics",
    stock: 42,
    featured: true,
    createdAt: Date.now(),
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "Heavyweight organic cotton t-shirt with a relaxed fit. Pre-shrunk and garment-dyed for softness.",
    price: 45.00,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"],
    category: "Apparel",
    stock: 100,
    featured: false,
    createdAt: Date.now(),
  },
];