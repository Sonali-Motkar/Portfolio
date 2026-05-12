import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const revealSelector = [
  ".card",
  ".cinema-section",
  ".hero-copy-block",
  ".hero-portrait-stage",
  ".hero-statement",
  ".section-copy",
  ".about-panel",
  ".about-photo-card",
  ".project-card",
  ".showcase-card",
  ".skills-category-card",
  ".skills-chip",
  ".journey-card",
  ".cert-card",
  ".cert-showcase-card",
  ".result-card",
  ".contact-mini-card",
  ".contact-stat",
  ".contact-form-card",
  ".contact-panel-dark"
].join(", ");

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isOnePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = 420;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      document.documentElement.style.setProperty("--scroll-pct", progress.toFixed(3));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observedNodes = new WeakSet();
    const supportsIntersectionObserver = "IntersectionObserver" in window;
    const pendingFrameIds = new Set();

    const runNextFrame = (callback) => {
      const firstFrame = window.requestAnimationFrame(() => {
        pendingFrameIds.delete(firstFrame);
        const secondFrame = window.requestAnimationFrame(() => {
          pendingFrameIds.delete(secondFrame);
          callback();
        });
        pendingFrameIds.add(secondFrame);
      });
      pendingFrameIds.add(firstFrame);
    };

    const revealObserver = supportsIntersectionObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                runNextFrame(() => {
                  entry.target.classList.add("is-in-view");
                });
                revealObserver.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -16% 0px"
          }
        )
      : null;

    const observeRevealTargets = () => {
      document.querySelectorAll(revealSelector).forEach((node, index) => {
        if (observedNodes.has(node)) return;

        observedNodes.add(node);
        node.classList.add("reveal-on-scroll");
        node.classList.remove("is-in-view");
        if (!node.style.getPropertyValue("--reveal-index")) {
          node.style.setProperty("--reveal-index", String(index % 8));
        }

        runNextFrame(() => {
          if (revealObserver) {
            revealObserver.observe(node);
            return;
          }

          node.classList.add("is-in-view");
        });
      });
    };

    const initialFrame = window.requestAnimationFrame(observeRevealTargets);
    const mutationObserver = new MutationObserver(observeRevealTargets);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      pendingFrameIds.forEach((frameId) => window.cancelAnimationFrame(frameId));
      mutationObserver.disconnect();
      if (revealObserver) revealObserver.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = null;

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const xPct = mouseX / Math.max(window.innerWidth, 1);
      const yPct = mouseY / Math.max(window.innerHeight, 1);
      document.documentElement.style.setProperty("--mouse-x", xPct.toFixed(3));
      document.documentElement.style.setProperty("--mouse-y", yPct.toFixed(3));
      if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const publicLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#projects", label: "Projects" },
    { href: "/#education", label: "Education" },
    { href: "/#certifications", label: "Certifications" },
    { href: "/#contact", label: "Contact" }
  ];

  return (
    <div className={`page-shell cyber-theme ${isOnePage ? "one-page-shell" : ""}`.trim()}>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="ambient-layer" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>

      <div className="container">
        <header className="header">
          <Link to="/#home" className="brand">
            Portfolio
          </Link>
          <nav>
            {isOnePage ? (
              publicLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/skills">Skills</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/academic-results">Academic Results</NavLink>
                <NavLink to="/certifications">Certifications</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PublicLayout;
