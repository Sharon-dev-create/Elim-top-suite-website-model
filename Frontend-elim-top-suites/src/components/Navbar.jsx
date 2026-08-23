import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/#rooms", label: "Rooms" },
  { to: "/#experience", label: "Experience" },
  { to: "/#events", label: "Events" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-surface transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-unit max-w-container-max mx-auto h-20">
        <Link
          to="/"
          className="font-display text-display-lg-mobile md:text-display-lg text-primary whitespace-nowrap"
        >
          Elim Top Suites
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body text-label-sm tracking-widest uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm rounded uppercase tracking-wider"
          >
            Book Now
          </Link>
        </div>

        <button
          aria-label="Toggle Menu"
          className="md:hidden text-primary p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="material-symbols-outlined text-3xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-t border-surface-variant shadow-lg py-4 px-margin-mobile flex flex-col space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setOpen(false)}
              className="block text-on-surface hover:text-primary py-2 font-body text-label-sm uppercase"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-3 mt-4 bg-primary text-on-primary font-body text-label-sm rounded uppercase"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
