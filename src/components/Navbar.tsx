import { useState } from "react";
import { Menu, X, Phone, LogIn } from "lucide-react";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Floor Plans", href: "#floor-plans" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1.5">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Nixon Home Care Logo" className="h-9 w-9 rounded-full object-cover" />
          <div className="hidden sm:block">
            <span className="font-heading text-lg tracking-wide text-primary-foreground">
              Nixon Estate Senior Living
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 hover:text-accent text-sm tracking-widest uppercase font-body transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary-foreground">
            <Phone className="h-4 w-4 text-accent" />
            <a href="tel:7134192653" className="text-sm font-body tracking-wide hover:text-accent transition-colors">
              (713) 419-2653
            </a>
          </div>
          <a
            href="https://script.google.com/macros/s/AKfycbyVfMzRR2hnzH4QXD5i2u0jEoAfxTC3gtzs4VLjO4hFCSqHbapBT7REZVxHBGmRYntTxA/exec"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-nixon-dark text-xs font-heading tracking-wider uppercase px-4 py-2 rounded-lg transition-colors"
          >
            <LogIn className="h-3.5 w-3.5" />
            Resident Portal
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-primary-foreground/80 hover:text-accent text-sm tracking-widest uppercase font-body transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:7134192653" className="flex items-center gap-2 text-accent text-sm font-body">
            <Phone className="h-4 w-4" /> (713) 419-2653
          </a>
          <a
            href="https://script.google.com/macros/s/AKfycbyVfMzRR2hnzH4QXD5i2u0jEoAfxTC3gtzs4VLjO4hFCSqHbapBT7REZVxHBGmRYntTxA/exec"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 bg-accent hover:bg-accent/90 text-nixon-dark text-xs font-heading tracking-wider uppercase px-4 py-2.5 rounded-lg transition-colors mt-2"
          >
            <LogIn className="h-3.5 w-3.5" />
            Resident Portal
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
