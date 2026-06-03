"use client";

import React, { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. Loading Overlay */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Main Page Layout (fades in once loaded) */}
      <div 
        className={`relative min-h-screen bg-bg transition-opacity duration-1000 ${
          isLoading ? "opacity-0 select-none pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <Works />
          <Journal />
          <Explorations />
          <Stats />
        </main>
        <Footer />
      </div>
    </>
  );
}
