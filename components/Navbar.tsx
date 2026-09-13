"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scissors, Phone, Lock } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smart Detection Handler
  const handleBookingAction = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = "tel:+923332207677";
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Fashion Gallery", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Reviews", href: "#reviews" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-yellow-600/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Karachi Tailors Islamabad Home"
        >
          <Scissors
            className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.7)] group-hover:rotate-12 transition-transform duration-300"
            aria-hidden="true"
          />
          <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-white">
            Karachi{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              Tailors
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Desktop Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}

          {/* Smart CTA Button */}
          <button
            type="button"
            onClick={handleBookingAction}
            aria-label="Book Now - Call on mobile or scroll to contact section on desktop"
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:shadow-[0_0_25px_rgba(255,215,0,0.8)] cursor-pointer"
          >
            <Phone className="w-3 h-3" aria-hidden="true" />
            Book Now
          </button>

          {/* Admin Atelier Portal Access */}
          <Link
            href="/admin/login"
            aria-label="Staff Login"
            title="Admin Login Portal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-600/30 text-xs font-medium text-yellow-500 hover:text-yellow-300 hover:border-yellow-400 transition bg-yellow-500/5 hover:bg-yellow-500/10"
          >
            <Lock className="w-3.5 h-3.5 text-yellow-400" />
            <span>Staff</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          className="md:hidden text-yellow-400 p-2 hover:bg-yellow-600/10 rounded-lg transition cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-yellow-600/20 overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-yellow-400 font-medium py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}

          <a
            href="tel:+923332207677"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-lg font-bold uppercase text-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call for Appointment
          </a>

          {/* Mobile Admin Portal Link */}
          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="w-full text-center border border-yellow-600/30 text-yellow-500 py-2.5 rounded-lg text-xs font-semibold uppercase flex items-center justify-center gap-2 hover:bg-yellow-500/10 transition"
          >
            <Lock className="w-3.5 h-3.5" />
            Staff Portal Login
          </Link>
        </nav>
      </div>
    </header>
  );
}