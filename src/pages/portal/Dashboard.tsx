import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Building, Wrench, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ residents: 0, units: 0, openRequests: 0, pendingPayments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [r, u, m, p] = await Promise.all([
        supabase.from("residents").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("units").select("id", { count: "exact", head: true }),
        supabase.from("maintenance_requests").select("id", { count: "exact", head: true }).in("status", ["pending", "in_progress"]),
        supabase.from("payments").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setStats({
        residents: r.count ?? 0,
        units: u.count ?? 0,
        openRequests: m.count ?? 0,
        pendingPayments: p.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Active Residents", value: stats.residents, icon: Users, color: "text-accent" },
    { label: "Total Units", value: stats.units, icon: Building, color: "text-primary" },
    { label: "Open Requests", value: stats.openRequests, icon: Wrench, color: "text-destructive" },
    { label: "Pending Payments", value: stats.pendingPayments, icon: CreditCard, color: "text-muted-foreground" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-body">{c.label}</span>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="text-3xl font-heading text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResidentDashboard = () => {
  const { user } = useAuth();
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("announcements")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setRecentAnnouncements(data ?? []));
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-2">Welcome Home</h1>
      <p className="text-muted-foreground font-body text-sm mb-6">Your resident dashboard</p>

      <div className="space-y-4">
        <h2 className="font-heading text-lg text-foreground">Recent Announcements</h2>
        {recentAnnouncements.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body">No announcements yet.</p>
        ) : (
          recentAnnouncements.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading text-sm text-foreground">{a.title}</h3>
              <p className="text-xs text-muted-foreground font-body mt-1">{a.content}</p>
              <p className="text-xs text-muted-foreground/60 font-body mt-2">
                {new Date(a.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { role } = useAuth();
  return role === "admin" ? <AdminDashboard /> : <ResidentDashboard />;
};

export default Dashboard;
