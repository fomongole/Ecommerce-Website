import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { AdminGuard } from "./components/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <AdminGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminSidebar />
        <main className="pl-64 min-h-screen">
          <div className="container mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}