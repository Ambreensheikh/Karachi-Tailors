import { isAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import Sidebar from "../Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
