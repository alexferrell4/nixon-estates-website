import { useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/scrollToSection";

/**
 * Returns a click handler factory for same-site anchors (href="/#id") that
 * reliably jump to a section on the homepage, whether we're already there
 * or need to navigate over from another route first.
 */
export function useSectionLink() {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return; // let the browser handle new-tab / modified clicks via the href
    }
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      scrollToSection(id);
    }
  };
}
