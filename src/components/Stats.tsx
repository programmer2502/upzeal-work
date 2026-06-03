"use client";

import React from "react";
import { motion } from "framer-motion";

const statsList = [
  {
    number: "2+",
    label: "Years Experience",
    description: "Designing digital workflows and architecting frontend environments.",
  },
  {
    number: "10+",
    label: "Projects Done",
    description: "Successfully delivered corporate software systems and mobile hubs.",
  },
  {
    number: "200%",
    label: "Satisfied Clients",
    description: "Delivering exceptional technical standards and post-launch support.",
  },
];

export default function Stats() {
  return (
    <section id="resume" className="bg-bg py-16 md:py-24 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col gap-3 pt-8 md:pt-0 md:px-8 first:pt-0 first:pl-0"
            >
              {/* Statistical figure */}
              <div className="text-5xl md:text-6xl lg:text-7xl font-display text-text-primary italic leading-none font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-muted">
                  {stat.number}
                </span>
              </div>
              
              {/* Label */}
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-xs md:text-sm text-muted leading-relaxed max-w-xs">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
