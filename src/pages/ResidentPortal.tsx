import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowLeft, Home, Wrench, Megaphone, CreditCard, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";

const features = [
  { icon: CreditCard, label: "Rent & Payments", description: "View and manage your payments" },
  { icon: Wrench, label: "Maintenance Requests", description: "Submit and track repair requests" },
  { icon: Megaphone, label: "Announcements", description: "Stay updated with community news" },
  { icon: Home, label: "My Unit", description: "Access your lease and unit details" },
];

const ResidentPortal = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-nixon-dark">
        <div className="animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user) return <Navigate to="/portal/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "We sent you a confirmation link." });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-nixon-dark flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm font-body"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Branding & Features */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
              <img src={logo} alt="Nixon Home Care Logo" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h1 className="font-heading text-2xl text-primary-foreground">Nixon Estate Senior Living</h1>
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-body">Resident Portal</p>
              </div>
            </div>

            <p className="text-primary-foreground/60 font-body text-sm mb-8 max-w-md mx-auto lg:mx-0">
              Access your account to manage payments, submit maintenance requests, and stay connected with your community.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map(({ icon: Icon, label, description }) => (
                <div key={label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-4 text-left">
                  <Icon className="h-5 w-5 text-accent mb-2" />
                  <h3 className="text-primary-foreground text-sm font-heading mb-1">{label}</h3>
                  <p className="text-primary-foreground/50 text-xs font-body">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Login/Signup Form */}
          <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                  {isSignUp ? <User className="h-5 w-5 text-accent" /> : <LogIn className="h-5 w-5 text-accent" />}
                </div>
                <h2 className="font-heading text-xl text-primary-foreground">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-primary-foreground/50 text-sm font-body mt-1">
                  {isSignUp ? "Sign up for your resident account" : "Sign in to your account"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div>
                    <label className="block text-primary-foreground/70 text-xs font-body uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/30" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full bg-nixon-dark border border-primary-foreground/15 rounded-lg py-3 pl-10 pr-4 text-primary-foreground text-sm font-body placeholder:text-primary-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-primary-foreground/70 text-xs font-body uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-nixon-dark border border-primary-foreground/15 rounded-lg py-3 pl-10 pr-4 text-primary-foreground text-sm font-body placeholder:text-primary-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-primary-foreground/70 text-xs font-body uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/30" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full bg-nixon-dark border border-primary-foreground/15 rounded-lg py-3 pl-10 pr-4 text-primary-foreground text-sm font-body placeholder:text-primary-foreground/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-nixon-dark font-heading text-sm py-3 rounded-lg transition-colors tracking-wider uppercase disabled:opacity-50"
                >
                  {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              <p className="text-center text-primary-foreground/40 text-xs font-body mt-6">
                {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-accent hover:underline"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentPortal;
