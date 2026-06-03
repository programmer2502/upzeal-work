"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter animation logic
  useEffect(() => {
    const totalDuration = 2700; // ms
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const currentCount = Math.floor(progress * 100);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        // Delay onComplete by 400ms when we hit 100
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    requestAnimationFrame(animateCount);
  }, [onComplete]);

  // Word cycling logic (runs every 900ms: 3 words total over 2700ms)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Top Left: Title Label */}
      <div className="flex items-start">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em]"
        >
          Portfolio
        </motion.span>
      </div>

      {/* Center: Rotating text */}
      <div className="flex justify-center items-center h-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Counter & Progress */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-baseline">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums font-light">
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Loading progress bar */}
        <div className="relative w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 bottom-0 accent-gradient rounded-full shadow-[0_0_8px_rgba(137,170,204,0.35)]"
            style={{ 
              width: `${count}%`,
              transformOrigin: "left"
            }}
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
