import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactFooter from "@/components/ContactSection";

// ✅ SEO Metadata
export const metadata = {
  title: "Karachi Tailors | Best Ladies Tailor in Islamabad",
  description:
    "Expert in bridal dresses, fancy suits, and custom stitching in Islamabad. Premium tailoring services with perfect finishing.",
  keywords: [
    "Ladies Tailor Islamabad",
    "Bridal Dresses",
    "Fancy Suits",
    "Custom Stitching",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      
      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <div className="pt-20">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactFooter />
      </div>

    </main>
  );
}