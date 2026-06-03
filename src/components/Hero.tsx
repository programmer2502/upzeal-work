"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsSource = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSource;
    }
  }, []);

  // Cycles the roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate eyebrow, name, description and buttons
    tl.fromTo(
      ".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.15, delay: 0.3 }
    );
    tl.fromTo(
      ".name-reveal",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=0.9"
    );
  }, []);

  const scrollToWorks = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const worksSection = document.querySelector("#work");
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* 1. Background HLS Video */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Bottom soft gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-20 pointer-events-none" />
      </div>

      {/* 2. Hero Content */}
      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6 mt-16 md:mt-24">
        {/* Eyebrow */}
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] font-medium">
          COLLECTION &apos;26
        </span>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.95] tracking-tight text-text-primary select-none">
          Upzeal
        </h1>

        {/* Role Rotating line */}
        <div className="blur-in text-lg md:text-2xl font-light text-muted">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block mr-1.5"
          >
            {roles[roleIndex]}
          </span>{" "}
          lives in Bangalore.
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA buttons */}
        <div className="blur-in flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          {/* See Works Solid CTA */}
          <button
            onClick={scrollToWorks}
            className="relative group rounded-full p-[2px] overflow-hidden hover:scale-105 transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-text-primary group-hover:accent-gradient transition-all" />
            <span className="relative z-10 block rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-8 py-3.5 text-sm font-semibold transition-all">
              See Works
            </span>
          </button>

          {/* Reach Out Outlined CTA */}
          <button
            onClick={scrollToContact}
            className="relative group rounded-full p-[2px] overflow-hidden hover:scale-105 transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-stroke group-hover:accent-gradient transition-all" />
            <span className="relative z-10 block rounded-full bg-bg text-text-primary px-8 py-3.5 text-sm font-semibold transition-all">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      {/* 3. Scroll Indicator (Bottom Center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <a
          href="#work"
          onClick={scrollToWorks}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-[10px] tracking-[0.25em] text-muted uppercase">SCROLL</span>
          <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[15px] accent-gradient animate-scroll-down rounded-full shadow-[0_0_4px_#89AACC]" />
          </div>
        </a>
      </div>
    </section>
  );
}
