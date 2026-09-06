"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Bridal Dress Stitching in Islamabad",
      desc: "Elegant bridal dresses with premium embroidery, luxury fabrics, and perfect fitting for your special day.",
      img: "/bridal.jpg",
    },
    {
      title: "Ladies Custom Tailoring",
      desc: "Beautifully stitched shalwar kameez, formal wear, and party dresses designed according to your style.",
      img: "/ladies.jpg",
    },
    {
      title: "Fancy & Party Wear Stitching",
      desc: "Stylish fancy dresses with modern cuts, detailing, and finishing for events and occasions.",
      img: "/fancy.jpg",
    },
    {
      title: "Perfect Fitting & Alterations",
      desc: "Professional alterations to ensure flawless fitting and a polished look for every outfit.",
      img: "/alteration.jpg",
    },
  ];

  const handleDiscussDesign = () => {
    const phoneNumber = "923332207677";
    const text = "Hi Karachi Tailors! I would like to discuss my outfit design and stitching details with you.";
    const encodedText = encodeURIComponent(text);

    // Device check: Mobile vs Desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile user: Direct WhatsApp app open hogi
      window.location.href = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    } else {
      // Desktop user: Direct WhatsApp Web open hoga (Pick an app dialog bypass)
      window.open(
        `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`,
        "_blank"
      );
    }
  };

  return (
    <section id="services" className="relative bg-[#0a0a0a] py-20 px-6 scroll-mt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
          Our{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
            Ladies Tailoring Services
          </span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-lg">
          Karachi Tailors offers premium ladies tailoring services in Islamabad, including bridal wear, custom stitching, and expert alterations.
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <article
              key={index}
              className="group bg-[#111] border border-yellow-600/20 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.15)] flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
              </div>

              {/* Content */}
              <div className="p-5 text-left flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Smart WhatsApp CTA */}
        <div className="mt-12">
          <button
            type="button"
            onClick={handleDiscussDesign}
            aria-label="Discuss your design with Karachi Tailors on WhatsApp"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black px-8 py-3.5 rounded-full font-bold uppercase text-sm tracking-wide shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Discuss Your Design
          </button>
        </div>
      </div>
    </section>
  );
}