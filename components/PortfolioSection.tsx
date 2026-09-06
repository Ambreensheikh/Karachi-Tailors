"use client";

import Image from "next/image";
import { Eye, Sparkles } from "lucide-react";

// ✅ Correct images (according to your public folder)
const portfolioItems = [
  {
    src: "/bridalMaroon.jpg",
    alt: "Red Bridal Lehenga with Heavy Gold Zardozi Embroidery stitched by Karachi Tailors Islamabad",
    title: "Royal Red Lehenga",
    category: "Bridal Wear",
  },
  {
    src: "/fancylehnga.jpg",
    alt: "Bridal lehenga with marori work and stone detailing",
    title: "Lehenga Masterpiece",
    category: "Bridal Wear",
  },
  {
    src: "/fancyDress.jpg", // ✅ FIXED (was fancyFrock.jpg ❌)
    alt: "Sky Blue embroidered fancy party wear dress",
    title: "Sky Blue Attraction",
    category: "Party Wear",
  },
  {
    src: "/coatStyle.jpg", // ✅ FIXED (replace coatStyle.jpg ❌)
    alt: "Elegant ladies custom stitched outfit",
    title: "Elegant Outfit",
    category: "Modern Wear",
  },
  {
    src: "/stylishBlouse.jpg", // ✅ FIXED (was alterations.jpg ❌)
    alt: "Perfect fitting and alteration services",
    title: "Stylish Blouse",
    category: "SaariBlouse",
  },
  {
    src: "/alterationss.jpg", // ✅ FIXED (was alterations.jpg ❌)
    alt: "Perfect fitting and alteration services",
    title: "Perfect Fitting",
    category: "Alterations",
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="pt-24 pb-8 px-4 bg-[#0a0a0a] relative overflow-hidden scroll-mt-24">
      
      {/* Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" /> Our Masterpieces
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6 text-white">
            Bridal{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our handcrafted bridal and formal dresses designed with perfection in Islamabad.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {portfolioItems.map((item, i) => (
            <article
              key={i}
              className="rounded-xl overflow-hidden group cursor-pointer border border-yellow-600/10 hover:border-yellow-400/40 transition-all duration-500"
            >
              
              <div className="relative aspect-[3/4]">
                
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i === 0}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-6">
                  
                  <span className="text-yellow-400 text-xs font-bold uppercase mb-2">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-yellow-300 text-sm">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
            </article>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://wa.me/923332207677?text=Hi!%20I%20want%20to%20see%20more%20designs."
            target="_blank"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition"
          >
            <Sparkles className="w-5 h-5" />
            See More Designs
          </a>
        </div>

      </div>
    </section>
  );
}