// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

export const metadata: Metadata = {
  title: "Karachi Tailors - Bridal Expert",
  description: "Perfect Stitches, Perfect You.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#0d0d0d] text-white">
        <ScrollAnimationWrapper>
          {children}
        </ScrollAnimationWrapper>
      </body>
    </html>
  );
}