"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Loader2, MapPin } from "lucide-react";

import { db } from "@/lib/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Customer {
  id: string; // We'll use email as ID for uniqueness in this view
  name: string;
  email: string;
  address: string;
  city: string;
  totalSpent: number;
  ordersCount: number;
  lastOrderDate: number;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const customerMap = new Map<string, Customer>();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Skip if customer data is missing
          if (!data.customer || !data.customer.email) return;

          const email = data.customer.email;

          if (!customerMap.has(email)) {
            customerMap.set(email, {
              id: email,
              name: data.customer.name,
              email: email,
              address: data.customer.address,
              city: data.customer.city,
              totalSpent: 0,
              ordersCount: 0,
              lastOrderDate: 0,
            });
          }

          const customer = customerMap.get(email)!;
          customer.totalSpent += (data.total || 0);
          customer.ordersCount += 1;
          // Keep the latest date
          if (data.createdAt > customer.lastOrderDate) {
            customer.lastOrderDate = data.createdAt;
          }
        });

        setCustomers(Array.from(customerMap.values()));
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-96 items-center">
        <Loader2 className="animate-spin text-blue-600 h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customers</h1>
        <p className="text-slate-500 dark:text-slate-400">View your customer base and their lifetime value.</p>
      </div>

      <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right">Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                  No customers found yet.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {customer.name ? customer.name.substring(0, 2).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{customer.name}</span>
                        <span className="text-xs text-slate-500">{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{customer.city}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.ordersCount}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-slate-500">
                    {new Date(customer.lastOrderDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}