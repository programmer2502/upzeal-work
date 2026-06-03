"use client";

import React from "react";
import { motion } from "framer-motion";

const journalEntries = [
  {
    title: "Upzeal Platform — Connecting talent with opportunities.",
    image: "/logo.png",
    readTime: "5 min read",
    date: "May 12, 2026",
    isBuilding: true,
  },
  {
    title: "Fogseason HVAC — Built a website for their company.",
    image: "/fogseason.png",
    readTime: "8 min read",
    date: "Apr 28, 2026",
    isLive: true,
  },
  {
    title: "Land24 — Built a website for their company.",
    image: "/land24.png",
    readTime: "4 min read",
    date: "Mar 15, 2026",
    isLive: true,
  },
  {
    title: "Orion Agri Science — Built an Android app.",
    image: "/orion.png",
    readTime: "6 min read",
    date: "Feb 09, 2026",
    isLive: true,
  },
];

export default function Journal() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-12 md:gap-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-4 max-w-lg">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-display italic font-light text-text-primary tracking-tight leading-none">
              Products Defining Our Journey
            </h2>
            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed">
              Sharing technical reflections, design patterns, and observations on interface nuances.
            </p>
          </div>

          {/* View all button (desktop only) */}
          <button
            onClick={scrollToContact}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-surface border border-stroke text-text-primary hover:scale-105 hover:border-transparent hover:shadow-[0_0_15px_rgba(137,170,204,0.15)] relative group overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: "-1px" }} />
            <span>Projects details</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-4 md:gap-5 w-full">
          {journalEntries.map((entry, idx) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:px-8 bg-surface/30 hover:bg-surface border border-stroke rounded-[24px] sm:rounded-full group transition-all duration-300 cursor-pointer"
            >
              {/* Left Column: Image Thumbnail + Title */}
              <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-xl sm:rounded-full overflow-hidden shrink-0 bg-stroke border border-white/5 relative">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all leading-tight">
                  {entry.title}
                </h3>
              </div>

              {entry.isBuilding && (
                <div className="shrink-0 self-end sm:self-center ml-auto sm:ml-0">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    Building
                  </span>
                </div>
              )}

              {entry.isLive && (
                <div className="shrink-0 self-end sm:self-center ml-auto sm:ml-0">
                  <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full select-none">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                    Live
                  </span>
                </div>
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
