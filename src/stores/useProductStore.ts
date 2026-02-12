import { create } from "zustand";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";

interface ProductState {
  products: Product[];
  isLoading: boolean;
  lastFetched: number;
  fetchProducts: (force?: boolean) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  lastFetched: 0,

  fetchProducts: async (force = false) => {
    const { products, lastFetched, isLoading } = get();
    
    // If we have products and fetched less than 5 minutes ago, don't refetch
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (!force && products.length > 0 && (now - lastFetched < fiveMinutes)) {
      return; 
    }

    if (isLoading) return;

    set({ isLoading: true });

    try {
      const q = query(
        collection(db, "products"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      set({ products: data, lastFetched: now, isLoading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },
}));
