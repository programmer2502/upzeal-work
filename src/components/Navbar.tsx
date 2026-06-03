"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, selector: string) => {
    e.preventDefault();
    setActiveLink(name);
    const element = document.querySelector(selector);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-1.5 md:py-2 transition-all duration-300 pointer-events-auto ${
          scrolled ? "shadow-lg shadow-black/30 backdrop-blur-md" : "backdrop-blur-sm"
        }`}
      >
        {/* 1. Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleLinkClick(e, "Home", "#hero")}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          animate={{ scale: isLogoHovered ? 1.1 : 1 }}
          className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shrink-0"
        >
          {/* Outer ring gradient. On hover we reverse spin orientation */}
          <motion.div
            className="absolute inset-0 rounded-full accent-gradient"
            animate={{ rotate: isLogoHovered ? -180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          {/* Inner masking container */}
          <div className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Upzeal Logo" className="w-full h-full object-cover scale-102" />
          </div>
        </motion.a>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {["Home", "Work", "Resume"].map((link) => {
            const isActive = activeLink === link;
            const targetId = link === "Home" ? "#hero" : link === "Work" ? "#work" : "#resume";
            return (
              <a
                key={link}
                href={targetId}
                onClick={(e) => {
                  if (link === "Resume") {
                    e.preventDefault();
                    // Custom action for resume section or click
                    const elem = document.querySelector("#stats");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                    setActiveLink(link);
                  } else {
                    handleLinkClick(e, link, targetId);
                  }
                }}
                className={`text-xs rounded-full px-3 py-1.5 transition-all font-medium select-none ${
                  isActive
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/30"
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* 5. "Say hi" button */}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, "Contact", "#contact")}
          className="relative inline-flex items-center text-xs font-semibold rounded-full group p-[1px] overflow-hidden"
        >
          {/* Animated gradient ring behind on hover */}
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: "-2px" }} />
          
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-white/5 group-hover:border-transparent text-text-primary backdrop-blur-md transition-all">
            Say hi <span className="text-[10px] font-sans group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
