"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export default function HeroSection() {
  const handleBookingClick = () => {
    // Check karein device mobile hai ya desktop/laptop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile user: Seedha phone dialer open hoga
      window.location.href = "tel:+923332207677";
    } else {
      // Desktop/Laptop user: Smoothly contact form par scroll hoga (bina kisi Windows app popup ke)
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section 
      id="home"
      aria-label="Hero Section"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Karachi Tailors Islamabad - Luxury Bridal and Custom Tailoring Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/75 -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.25),transparent_60%)] -z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-6">
        <p className="text-yellow-400 uppercase tracking-widest text-xs md:text-sm mb-4">
          Premium Tailoring in Islamabad
        </p>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            Bridal &amp; Custom Tailoring
          </span>{" "}
          in Islamabad
        </h1>

        <p className="mt-6 text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
          Experience luxury stitching with perfect fitting, premium fabrics, and expert tailoring. 
          Karachi Tailors delivers elegant bridal wear, custom suits, and flawless alterations.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Smart Button */}
          <button
            type="button"
            onClick={handleBookingClick}
            aria-label="Book an Appointment - Call on mobile or scroll to form on desktop"
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.9)] transition cursor-pointer"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Book Appointment
          </button>

          <a
            href="#portfolio"
            aria-label="View bridal and formal wear gallery"
            className="px-6 py-3 rounded-full border border-yellow-500 text-yellow-400 font-semibold text-sm uppercase tracking-wide hover:bg-yellow-500 hover:text-black transition cursor-pointer"
          >
            View Gallery
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center text-gray-400 text-xs animate-bounce pointer-events-none">
        <span>Scroll</span>
        <div className="w-[1px] h-6 bg-yellow-400 mt-1"></div>
      </div>
    </section>
  );
}