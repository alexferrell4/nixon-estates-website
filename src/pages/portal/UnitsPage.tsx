import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const UnitsPage = () => {
  const { role } = useAuth();
  const { toast } = useToast();
  const [units, setUnits] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ unit_number: "", unit_type: "1BR", monthly_rent: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role !== "admin") return;
    const fetchUnits = async () => {
      const { data } = await supabase.from("units").select("*").order("unit_number");
      setUnits(data ?? []);
    };
    fetchUnits();
  }, [role]);

  if (role !== "admin") return <Navigate to="/portal/dashboard" replace />;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("units").insert({
      unit_number: form.unit_number,
      unit_type: form.unit_type,
      monthly_rent: parseFloat(form.monthly_rent) || 0,
      description: form.description || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Unit added" });
      setForm({ unit_number: "", unit_type: "1BR", monthly_rent: "", description: "" });
      setShowAdd(false);
      const { data } = await supabase.from("units").select("*").order("unit_number");
      setUnits(data ?? []);
    }
    setLoading(false);
  };

  const statusColor = (s: string) => {
    if (s === "available") return "bg-accent/10 text-accent";
    if (s === "occupied") return "bg-primary/10 text-primary";
    return "bg-destructive/10 text-destructive";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-foreground">Units</h1>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-body px-3 py-2 rounded-lg transition-colors">
              <Plus className="h-3.5 w-3.5" /> Add Unit
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Add Unit</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Unit Number</label>
                <input
                  required
                  value={form.unit_number}
                  onChange={(e) => setForm({ ...form, unit_number: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Type</label>
                <select
                  value={form.unit_type}
                  onChange={(e) => setForm({ ...form, unit_type: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="Studio">Studio</option>
                  <option value="1BR">1 Bedroom</option>
                  <option value="2BR">2 Bedroom</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Monthly Rent ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.monthly_rent}
                  onChange={(e) => setForm({ ...form, monthly_rent: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-body text-muted-foreground mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  rows={2}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Unit"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm col-span-full text-center py-8">
            No units yet. Add your first unit to get started.
          </p>
        ) : (
          units.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-lg text-foreground">Unit {u.unit_number}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-body ${statusColor(u.status)}`}>
                  {u.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-body">{u.unit_type}</p>
              <p className="text-lg font-heading text-foreground mt-2">
                ${Number(u.monthly_rent).toLocaleString()}<span className="text-xs text-muted-foreground font-body">/mo</span>
              </p>
              {u.description && (
                <p className="text-xs text-muted-foreground font-body mt-2">{u.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UnitsPage;
