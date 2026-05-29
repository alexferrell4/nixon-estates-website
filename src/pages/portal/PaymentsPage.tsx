import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const PaymentsPage = () => {
  const { role } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchPayments = async () => {
      const { data } = await supabase
        .from("payments")
        .select("*, residents:resident_id(user_id, profiles:user_id(full_name), units:unit_id(unit_number))")
        .order("due_date", { ascending: false });
      setPayments(data ?? []);
    };
    fetchPayments();
  }, []);

  const statusColor = (s: string) => {
    if (s === "paid") return "bg-accent/10 text-accent";
    if (s === "pending") return "bg-primary/10 text-primary";
    if (s === "overdue") return "bg-destructive/10 text-destructive";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-6">Payments</h1>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {isAdmin && <th className="text-left p-3 font-body font-medium text-muted-foreground">Resident</th>}
              <th className="text-left p-3 font-body font-medium text-muted-foreground">Type</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground">Amount</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground hidden sm:table-cell">Due Date</th>
              <th className="text-left p-3 font-body font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="p-6 text-center text-muted-foreground font-body">
                  No payment records.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  {isAdmin && (
                    <td className="p-3 font-body text-foreground">
                      {p.residents?.profiles?.full_name || "—"}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({p.residents?.units?.unit_number || "—"})
                      </span>
                    </td>
                  )}
                  <td className="p-3 font-body text-foreground capitalize">{p.payment_type}</td>
                  <td className="p-3 font-body text-foreground">${Number(p.amount).toLocaleString()}</td>
                  <td className="p-3 font-body text-muted-foreground hidden sm:table-cell">
                    {new Date(p.due_date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-body ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
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

export default PaymentsPage;
