import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Building, Calendar, Phone, User } from "lucide-react";

const MyUnitPage = () => {
  const { user } = useAuth();
  const [resident, setResident] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnit = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("residents")
        .select("*, units:unit_id(*), profiles:user_id(full_name, phone)")
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle();
      setResident(data);
      setLoading(false);
    };
    fetchUnit();
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center py-12">
      <div className="animate-spin h-6 w-6 border-2 border-accent border-t-transparent rounded-full" />
    </div>;
  }

  if (!resident) {
    return (
      <div className="text-center py-12">
        <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-heading text-xl text-foreground mb-2">No Unit Assigned</h1>
        <p className="text-muted-foreground font-body text-sm">Contact management to get assigned to a unit.</p>
      </div>
    );
  }

  const unit = resident.units;

  return (
    <div>
      <h1 className="font-heading text-2xl text-foreground mb-6">My Unit</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Building className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-lg text-foreground">Unit {unit?.unit_number}</h2>
          </div>
          <div className="space-y-2 text-sm font-body">
            <p><span className="text-muted-foreground">Type:</span> <span className="text-foreground">{unit?.unit_type}</span></p>
            <p><span className="text-muted-foreground">Rent:</span> <span className="text-foreground">${Number(unit?.monthly_rent).toLocaleString()}/mo</span></p>
            {unit?.description && <p className="text-muted-foreground">{unit.description}</p>}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-accent" />
            <h2 className="font-heading text-lg text-foreground">Lease Info</h2>
          </div>
          <div className="space-y-2 text-sm font-body">
            <p><span className="text-muted-foreground">Move-in:</span> <span className="text-foreground">{resident.move_in_date ? new Date(resident.move_in_date).toLocaleDateString() : "—"}</span></p>
            <p><span className="text-muted-foreground">Lease ends:</span> <span className="text-foreground">{resident.lease_end_date ? new Date(resident.lease_end_date).toLocaleDateString() : "—"}</span></p>
          </div>
        </div>

        {(resident.emergency_contact_name || resident.emergency_contact_phone) && (
          <div className="bg-card border border-border rounded-lg p-5 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="h-5 w-5 text-accent" />
              <h2 className="font-heading text-lg text-foreground">Emergency Contact</h2>
            </div>
            <div className="space-y-2 text-sm font-body">
              {resident.emergency_contact_name && <p className="text-foreground">{resident.emergency_contact_name}</p>}
              {resident.emergency_contact_phone && <p className="text-muted-foreground">{resident.emergency_contact_phone}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUnitPage;
