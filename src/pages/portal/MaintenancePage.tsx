import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const MaintenancePage = () => {
  const { role, user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "medium" });
  const [residentInfo, setResidentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";

  const fetchRequests = async () => {
    let query = supabase
      .from("maintenance_requests")
      .select("*, residents:resident_id(user_id, profiles:user_id(full_name)), units:unit_id(unit_number)")
      .order("created_at", { ascending: false });
    const { data } = await query;
    setRequests(data ?? []);
  };

  const fetchResidentInfo = async () => {
    if (!user || isAdmin) return;
    const { data } = await supabase
      .from("residents")
      .select("id, unit_id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle();
    setResidentInfo(data);
  };

  useEffect(() => {
    fetchRequests();
    fetchResidentInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentInfo) {
      toast({ title: "Error", description: "No active resident record found.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("maintenance_requests").insert({
      resident_id: residentInfo.id,
      unit_id: residentInfo.unit_id,
      title: form.title,
      description: form.description || null,
      priority: form.priority,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Request submitted" });
      setForm({ title: "", description: "", priority: "medium" });
      setShowAdd(false);
      fetchRequests();
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("maintenance_requests").update({ status }).eq("id", id);
    fetchRequests();
  };

  const statusColor = (s: string) => {
    if (s === "pending") return "bg-accent/10 text-accent";
    if (s === "in_progress") return "bg-primary/10 text-primary";
    if (s === "completed") return "bg-muted text-muted-foreground";
    return "bg-destructive/10 text-destructive";
  };

  const priorityColor = (p: string) => {
    if (p === "urgent") return "text-destructive";
    if (p === "high") return "text-destructive/70";
    if (p === "medium") return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-foreground">Maintenance Requests</h1>
        {!isAdmin && residentInfo && (
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-body px-3 py-2 rounded-lg transition-colors">
                <Plus className="h-3.5 w-3.5" /> New Request
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">Submit Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="e.g. Leaking faucet"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    rows={3}
                    placeholder="Describe the issue..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1">Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm text-center py-8">No maintenance requests.</p>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-sm text-foreground">{r.title}</h3>
                    <span className={`text-xs font-body ${priorityColor(r.priority)}`}>
                      {r.priority}
                    </span>
                  </div>
                  {r.description && (
                    <p className="text-xs text-muted-foreground font-body mb-2">{r.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                    <span>Unit {r.units?.unit_number}</span>
                    {isAdmin && <span>• {r.residents?.profiles?.full_name || "Unknown"}</span>}
                    <span>• {new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${statusColor(r.status)}`}>
                    {r.status.replace("_", " ")}
                  </span>
                  {isAdmin && r.status !== "completed" && (
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="text-xs bg-background border border-border rounded py-1 px-2 font-body text-foreground"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;
