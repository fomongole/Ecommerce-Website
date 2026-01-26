"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Loader2, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { db } from "@/lib/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: number;
  items: any[];
}

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch User Orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        // Query orders where userId matches the current user's UID
        const q = query(
            collection(db, "orders"), 
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );
        
        const snapshot = await getDocs(q);
        const userOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Order[];

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) {
        fetchOrders();
    }
  }, [user]);

  if (authLoading || (!user && loadingOrders)) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-slate-900 shadow-lg">
          <AvatarImage src={user.photoURL || ""} />
          <AvatarFallback className="bg-blue-600 text-white text-xl">
             {user.displayName?.substring(0,2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.displayName}</h1>
            <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* Orders History */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-5 h-5" /> Order History
        </h2>

        {loadingOrders ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
        ) : orders.length === 0 ? (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-full mb-4">
                        <ShoppingCart className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium">No orders yet</p>
                    <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => router.push("/")}>Start Shopping</Button>
                </CardContent>
            </Card>
        ) : (
            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 py-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="font-bold">${order.total.toFixed(2)}</p>
                                    <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                                        {order.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                                            {item.image && (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}