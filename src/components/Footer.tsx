import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-nixon-dark px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Nixon Home Care Logo" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-heading text-lg text-primary-foreground">Nixon Signature Estates</p>
              <p className="text-primary-foreground/50 text-xs font-body">Courtesy of Nixon Home Care, Inc.</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-primary-foreground/70 text-sm font-body">
              Comfort · Dignity · Community
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/40 text-xs font-body">
              <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link>
              <span>·</span>
              <p>© {new Date().getFullYear()} Nixon Home Care, Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
