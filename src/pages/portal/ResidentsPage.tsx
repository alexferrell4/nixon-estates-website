import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Search } from "lucide-react";

const ResidentsPage = () => {
  const { role } = useAuth();
  const [residents, setResidents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role !== "admin") return;
    const fetchResidents = async () => {
      const { data } = await supabase
        .from("residents")
        .select("*, profiles:user_id(full_name, phone), units:unit_id(unit_number)")
        .order("created_at", { ascending: false });
      setResidents(data ?? []);
    };
    fetchResidents();
  }, [role]);

  if (role !== "admin") return <Navigate to="/portal/dashboard" replace />;

  const filtered = residents.filter((r) => {
    const name = r.profiles?.full_name?.toLowerCase() ?? "";
    const unit = r.units?.unit_number?.toLowerCase() ?? "";
    return name.includes(search.toLowerCase()) || unit.includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-foreground">Residents</h1>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search residents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-body font-medium text-muted-foreground">Name</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground">Unit</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground hidden md:table-cell">Move-in</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground font-body">
                  No residents found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-body text-foreground">{r.profiles?.full_name || "—"}</td>
                  <td className="p-3 font-body text-foreground">{r.units?.unit_number || "Unassigned"}</td>
                  <td className="p-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                      r.status === "active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 font-body text-muted-foreground hidden md:table-cell">
                    {r.move_in_date ? new Date(r.move_in_date).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentsPage;
