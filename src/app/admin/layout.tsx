import { logout } from "@/actions/auth";
import { AdminNav } from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground font-jakarta">
      <AdminNav logoutAction={logout} />

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
