'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import StackingCards from '@/components/StackingCards';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import EasterEgg from '@/components/EasterEgg';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <main className="relative w-full min-h-screen selection:bg-orange-500 selection:text-white">
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />
      <Navigation />
      
      <AnimatePresence>
        {isLocked && <Hero onUnlock={handleUnlock} />}
      </AnimatePresence>
      
      {/* Content */}
      <div className={isLocked ? 'fixed inset-0 pointer-events-none opacity-0' : 'relative opacity-100 transition-opacity duration-1000'}>
        {/* Add padding top to account for Navigation or just spacing */}
        <div className="pt-20">
            <About />
        </div>
        <Blog />
        <StackingCards />
        <Footer />
      </div>
      
      <EasterEgg />
    </main>
  );
}
