/**
 * Scrolls to an element by id, retrying until it exists (it may not be
 * mounted yet right after a route change) and re-correcting for a short
 * period afterward in case images/video below it are still loading and
 * shifting the page layout.
 */
export function scrollToSection(id: string) {
  const scrollNow = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const attempt = (retriesLeft: number) => {
    if (!document.getElementById(id)) {
      if (retriesLeft > 0) requestAnimationFrame(() => attempt(retriesLeft - 1));
      return;
    }
    scrollNow();
    // Correct for layout shift as images/video below the target finish loading.
    setTimeout(scrollNow, 400);
    setTimeout(scrollNow, 1000);
  };

  attempt(50);
}
