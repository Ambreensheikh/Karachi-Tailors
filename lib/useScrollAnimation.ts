"use client";

import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = document.querySelectorAll("[data-reveal], [data-stagger]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // optional: run once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}