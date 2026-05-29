import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { ResidentSidebar } from "./ResidentSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  const { user, role, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <Navigate to="/resident-portal" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {role === "admin" ? <AdminSidebar /> : <ResidentSidebar />}
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-foreground" />
              <img src={logo} alt="Logo" className="h-7 w-7 rounded-full object-cover" />
              <span className="font-heading text-sm text-foreground hidden sm:block">
                Nixon Estate
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-body hidden sm:block">
                {user.email}
              </span>
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-body capitalize">
                {role ?? "user"}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1 text-muted-foreground hover:text-destructive text-xs font-body transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PortalLayout;
