"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Fogseason HVAC",
    image: "/fogseason.png",
    link: "https://fogseason.in",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
  {
    title: "Land24",
    image: "/land24.png",
    link: "https://land24.vercel.app",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[12/10]",
  },
  {
    title: "Orion Agri Science",
    image: "/orion.png",
    link: "https://play.google.com/store/search?q=orion+agri+science&c=apps&hl=en",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[12/10]",
  },
  {
    title: "Upzeal Platform",
    image: "/upzeal_project.png",
    link: "https://upzeal.in",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
  },
];

export default function Works() {
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCardClick = (link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="work" className="bg-bg py-16 md:py-24 border-t border-white/5">
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
                Selected Work
              </span>
            </div>
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-light text-text-primary tracking-tight leading-none">
              Featured <span className="font-display italic">projects</span>
            </h2>
            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* View all work button (desktop only) */}
          <button
            onClick={scrollToContact}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-surface border border-stroke text-text-primary hover:scale-105 hover:border-transparent hover:shadow-[0_0_15px_rgba(137,170,204,0.15)] relative group overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: "-1px" }} />
            <span>View all work</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              onClick={() => handleCardClick(project.link)}
              className={`${project.span} ${project.aspect} bg-surface border border-stroke rounded-3xl relative group overflow-hidden cursor-pointer`}
            >
              {/* Card Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
              />

              {/* Halftone Dot Overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply z-10 pointer-events-none" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/75 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-300 z-20 flex items-center justify-center p-6">
                {/* Hover Label Pill */}
                <div className="relative p-[1.5px] rounded-full overflow-hidden animate-gradient-shift">
                  {/* Glowing background container */}
                  <div className="absolute inset-0 accent-gradient animate-gradient-shift" />
                  
                  {/* Inner Content Label */}
                  <div className="relative z-10 bg-white text-bg px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-xl font-semibold text-xs select-none">
                    <span>View —</span>
                    <span className="font-display italic font-bold">{project.title}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
