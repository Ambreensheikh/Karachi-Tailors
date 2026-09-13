// app/page.tsx
"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import ReviewsSection from '@/components/RiviewsSection';

      
export default function Home() {
  // Scroll animations initialize karein
  useScrollAnimation();

  return (
    <main className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* 1. Hero Section (Split Layout) */}
     <HeroSection /> 
      
      {/* 2. Services Section (Icons + Gold) */}

      {/* Reviews Section with Stars & Submission */}
      <ReviewsSection />

      <ServicesSection />
      
      {/* 3. Fashion Portfolio (Gallery) */}
       <PortfolioSection /> 
      
      
      
      {/* 4. Contact  */}
       <ContactSection /> 

      
    </main>
  );
} 