import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const AnnouncementsPage = () => {
  const { role, user } = useAuth();
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", published: true });
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";

  const fetch = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    setAnnouncements(data ?? []);
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("announcements").insert({
      title: form.title,
      content: form.content,
      published: form.published,
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Announcement created" });
      setForm({ title: "", content: "", published: true });
      setShowAdd(false);
      fetch();
    }
    setLoading(false);
  };

  const togglePublish = async (id: string, published: boolean) => {
    await supabase.from("announcements").update({ published: !published }).eq("id", id);
    fetch();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl text-foreground">Announcements</h1>
        {isAdmin && (
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-body px-3 py-2 rounded-lg transition-colors">
                <Plus className="h-3.5 w-3.5" /> New Announcement
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">New Announcement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1">Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1">Content</label>
                  <textarea
                    required
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                    rows={4}
                  />
                </div>
                <label className="flex items-center gap-2 font-body text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="rounded border-border"
                  />
                  Publish immediately
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Announcement"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3">
        {announcements.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm text-center py-8">No announcements.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-sm text-foreground">{a.title}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-1 whitespace-pre-wrap">{a.content}</p>
                  <p className="text-xs text-muted-foreground/60 font-body mt-2">
                    {new Date(a.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                    a.published ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                  }`}>
                    {a.published ? "Published" : "Draft"}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => togglePublish(a.id, a.published)}
                      className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors"
                    >
                      {a.published ? "Unpublish" : "Publish"}
                    </button>
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

export default AnnouncementsPage;
