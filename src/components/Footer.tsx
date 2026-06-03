"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
  { name: "Dribbble", href: "https://dribbble.com" },
  { name: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  // GSAP Infinite Marquee Animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-bg pt-20 md:pt-32 pb-8 md:pb-12 overflow-hidden border-t border-white/5">
      
      {/* 1. Background Flipped HLS Video */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        {/* Heavy dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-20 flex flex-col gap-16 md:gap-24 w-full">
        
        {/* Marquee Banner */}
        <div className="w-full overflow-hidden py-4 border-t border-b border-stroke bg-bg/40 backdrop-blur-sm">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-3xl md:text-5xl lg:text-7xl font-display uppercase tracking-widest text-text-primary/10 select-none w-fit"
          >
            <div className="flex gap-4 px-2">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, i) => (
                  <span key={i}>{text}</span>
                ))}
            </div>
            <div className="flex gap-4 px-2">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, i) => (
                  <span key={i + 10}>{text}</span>
                ))}
            </div>
          </div>
        </div>

        {/* Call to Action email block */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-light text-text-primary tracking-tight font-sans">
            Have a project in mind?
          </h2>
          <p className="text-xs md:text-sm text-muted max-w-sm leading-relaxed">
            Let&apos;s collaborate to design seamless digital experiences that focus on modern nuances.
          </p>

          {/* Contact buttons group with accent hover ring */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto justify-center">
            {/* Email button */}
            <a
              href="mailto:hello@upzeal.in"
              className="relative group rounded-full p-[2px] overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[220px]"
            >
              <span className="absolute inset-0 rounded-full bg-stroke group-hover:accent-gradient transition-all" />
              <span className="relative z-10 block rounded-full bg-bg text-text-primary px-8 py-4 text-sm font-semibold transition-all text-center">
                hello@upzeal.in
              </span>
            </a>

            {/* WhatsApp button */}
            <a
              href="https://wa.me/917022160982"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-full p-[2px] overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto min-w-[220px]"
            >
              <span className="absolute inset-0 rounded-full bg-stroke group-hover:accent-gradient transition-all" />
              <span className="relative z-10 block rounded-full bg-bg text-text-primary px-8 py-4 text-sm font-semibold transition-all text-center">
                WhatsApp
              </span>
            </a>
          </div>
        </div>

        {/* Footer Bar Links & Availability */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-stroke/60 mt-12">
          
          {/* Availability Dot */}
          <div className="flex items-center gap-2.5 bg-surface/50 border border-stroke px-4 py-1.5 rounded-full select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] md:text-xs text-slate-300 font-medium tracking-wide">
              Available for projects
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors duration-200 font-medium"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright Year */}
          <div className="text-[10px] md:text-xs text-muted font-light">
            &copy; {currentYear} Upzeal. All rights reserved.
          </div>

        </div>

      </div>

    </footer>
  );
}
