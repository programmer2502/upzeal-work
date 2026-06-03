"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const columnA = [
  {
    id: 1,
    title: "Fluid Dynamics",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-3deg]",
  },
  {
    id: 2,
    title: "Chroma Shift",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[2deg]",
  },
  {
    id: 3,
    title: "Abstract Gradients",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-1.5deg]",
  },
];

const columnB = [
  {
    id: 4,
    title: "Brutalist Space",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[3deg]",
  },
  {
    id: 5,
    title: "Eolian Dunes",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[-2deg]",
  },
  {
    id: 6,
    title: "Digital Wavefront",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop",
    rotation: "rotate-[1deg]",
  },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const colA = colARef.current;
    const colB = colBRef.current;

    if (!container || !pinned || !colA || !colB) return;

    // 1. GSAP ScrollTrigger Pinned Left Section
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: pinned,
      pinSpacing: false,
    });

    // 2. Parallax Columns Scrubbing (Column A scrolls faster, Column B scrolls slower)
    const animA = gsap.fromTo(
      colA,
      { y: 80 },
      {
        y: -220,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    const animB = gsap.fromTo(
      colB,
      { y: 220 },
      {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      }
    );

    return () => {
      pinTrigger.kill();
      animA.scrollTrigger?.kill();
      animB.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="explorations"
      className="relative w-full min-h-[200vh] md:min-h-[250vh] bg-bg py-24 border-t border-white/5"
    >
      {/* 2-column Main Grid layout */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start h-full relative">
        
        {/* Layer 1: Pinned Center Title block (Left Side - 5 cols) */}
        <div className="lg:col-span-5 h-auto lg:h-screen flex items-center z-10">
          <div ref={pinnedRef} className="flex flex-col gap-6 py-8 w-full max-w-sm">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Explorations
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-light text-text-primary tracking-tight leading-none">
              Visual <span className="font-display italic">playground</span>
            </h2>
            
            {/* Subtext */}
            <p className="text-sm text-muted leading-relaxed">
              Curated experiments exploring render depth, shadows, brutalist architectures, and color theory.
            </p>

            {/* Dribbble Button */}
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-surface border border-stroke text-text-primary hover:scale-105 hover:border-transparent hover:shadow-[0_0_15px_rgba(137,170,204,0.15)] relative group overflow-hidden w-fit cursor-pointer mt-2"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: "-1px" }} />
              <span>Follow on Dribbble</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Layer 2: Parallax Columns (Right Side - 7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6 md:gap-12 pt-12 md:pt-32 relative z-20">
          
          {/* Column A (Left Column - moves faster) */}
          <div ref={colARef} className="flex flex-col gap-8 md:gap-16">
            {columnA.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item.image)}
                className={`aspect-square w-full max-w-[320px] rounded-2xl bg-surface border border-stroke overflow-hidden relative cursor-pointer group shadow-2xl hover:scale-102 transition-transform duration-300 ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle overlay hover check */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-semibold text-text-primary px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    Expand
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column B (Right Column - moves slower) */}
          <div ref={colBRef} className="flex flex-col gap-8 md:gap-16 pt-16 md:pt-32">
            {columnB.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item.image)}
                className={`aspect-square w-full max-w-[320px] rounded-2xl bg-surface border border-stroke overflow-hidden relative cursor-pointer group shadow-2xl hover:scale-102 transition-transform duration-300 ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-semibold text-text-primary px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    Expand
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 3. Full Screen Lightbox Overlay */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out select-none"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scale Up Image */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative max-w-full max-h-[85vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()} // Stop propagation to close on overlay click
            >
              <img
                src={activeImage}
                alt="Exploration Lightbox"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
