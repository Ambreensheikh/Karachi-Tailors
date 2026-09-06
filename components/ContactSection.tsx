"use client";

import Script from "next/script";
import { Phone, MapPin, Clock, Send } from "lucide-react";

// ✅ SEO Local Business Schema (Friday Closed Fixed)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ClothingStore"],
  name: "Karachi Tailors Islamabad",
  description:
    "Expert bridal and formal wear stitching services in Islamabad. Specializing in lehengas, frocks, and alterations.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Malik Arcade, Shop no:15, Ghouri Town Phase 5, Opposite Cheezious",
    addressLocality: "Islamabad",
    addressRegion: "ICT",
    postalCode: "44000",
    addressCountry: "PK",
  },
  telephone: "+92-333-2207677",
  url: "https://yourdomain.com",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "23:00",
    },
  ],
  priceRange: "$$",
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact and Location Info"
      className="pt-8 pb-20 px-4 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Local Business JSON-LD */}
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium tracking-widest uppercase mb-4">
            Get In Touch
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6 text-white">
            Visit Our{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Studio
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to bring your dream outfit to life? Visit us for a
            consultation or reach out via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CONTACT INFO */}
          <address className="not-italic space-y-8">
            {/* LOCATION */}
            <div className="flex items-start gap-4 p-6 rounded-xl border border-yellow-600/10 hover:border-yellow-400/40 transition-all bg-black/20">
              <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Our Location
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Malik Arcade, Shop no:15, Ghouri Town Phase 5, Opposite Cheezious <br />
                  Islamabad, Pakistan
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-start gap-4 p-6 rounded-xl border border-yellow-600/10 hover:border-yellow-400/40 transition-all bg-black/20">
              <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400">
                <Phone className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Call or WhatsApp
                </h3>
                <a
                  href="tel:+923332207677"
                  className="text-gray-400 hover:text-yellow-400 transition-colors inline-block"
                  aria-label="Call Karachi Tailors at +92 333 220 7677"
                >
                  +92 333 220 7677
                </a>
              </div>
            </div>

            {/* HOURS */}
            <div className="flex items-start gap-4 p-6 rounded-xl border border-yellow-600/10 hover:border-yellow-400/40 transition-all bg-black/20">
              <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400">
                <Clock className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Working Hours
                </h3>
                <p className="text-gray-400">
                  Mon - Thu, Sat: 10:00 AM - 11:00 PM
                </p>
                <p className="text-red-400/80 text-sm mt-1">Friday: Closed</p>
              </div>
            </div>
          </address>

          {/* CONTACT FORM */}
          <div className="bg-black/40 p-8 rounded-2xl border border-yellow-600/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h3>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

                const phoneNumber = "923332207677";
                const text = `Hello Karachi Tailors,\nName: ${name}\nPhone: ${phone}\nRequirements: ${message}`;
                const encodedText = encodeURIComponent(text);

                const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

                if (isMobile) {
                  window.location.href = `https://wa.me/${phoneNumber}?text=${encodedText}`;
                } else {
                  window.open(
                    `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`,
                    "_blank"
                  );
                }
              }}
            >
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full bg-black/50 border border-yellow-600/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              />

              <input
                name="phone"
                type="tel"
                required
                placeholder="03XX XXXXXXX"
                aria-label="Phone Number"
                className="w-full bg-black/50 border border-yellow-600/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
              />

              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us about your requirements..."
                aria-label="Stitching Requirements"
                className="w-full bg-black/50 border border-yellow-600/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 resize-none"
              />

              <button
                type="submit"
                aria-label="Send message to Karachi Tailors via WhatsApp"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}