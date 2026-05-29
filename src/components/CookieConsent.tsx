import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "nixon-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-primary border border-primary-foreground/15 rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-10 h-10 rounded-full bg-accent/15 items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="h-5 w-5 text-accent" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-primary-foreground text-sm mb-1">We Value Your Privacy</h3>
            <p className="text-primary-foreground/60 text-xs font-body leading-relaxed">
              We use cookies to enhance your browsing experience and analyze site traffic.
              By clicking "Accept All," you consent to our use of cookies. Read our{" "}
              <Link to="/privacy-policy" className="text-accent hover:underline">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </div>

          <button
            onClick={decline}
            className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            onClick={decline}
            className="text-primary-foreground/60 hover:text-primary-foreground text-xs font-body tracking-wider uppercase px-4 py-2 rounded-lg border border-primary-foreground/15 hover:border-primary-foreground/30 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-accent hover:bg-accent/90 text-nixon-dark text-xs font-heading tracking-wider uppercase px-5 py-2 rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
