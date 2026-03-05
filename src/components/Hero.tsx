'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroProps {
  onUnlock: () => void;
}

const Hero = ({ onUnlock }: HeroProps) => {
  const [isLocked, setIsLocked] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleUnlock = () => {
    setIsLocked(false);
    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  // Shared content component with precise split alignment
  const HeroContent = () => {
    const x = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const y = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
    const xReverse = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
    const yReverse = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

    return (
    <div className="w-full h-full flex flex-col">
      {/* Upper Section - Ends exactly at vertical center */}
      <div className="flex-1 flex flex-col items-center justify-end pb-2 md:pb-3">
        <motion.div
          style={{ x, y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-xs md:text-sm font-medium text-neutral-400 uppercase tracking-widest"
          >
            AI Explorer Portfolio
          </motion.h2>
          
          <div className="relative z-20">
            <motion.h1 
              style={{ x: xReverse, y: yReverse }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight text-neutral-900 dark:text-neutral-100 text-center"
            >
              专注 AI 成长的创造者
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Lower Section - Starts exactly at vertical center */}
      <div className="flex-1 flex flex-col items-center justify-start pt-2 md:pt-3">
        <motion.div
            style={{ x, y }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
        >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-center group cursor-default">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-400 dark:from-neutral-400 dark:to-neutral-500 group-hover:from-orange-600 group-hover:to-amber-500 transition-all duration-700 ease-in-out">
                    用作品记录进步
                </span>
            </h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 flex flex-col items-center gap-10"
            >
                <div className="flex items-center gap-4 text-xs md:text-sm text-neutral-400 dark:text-neutral-500 font-medium tracking-wide">
                    <span>记录成长</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    <span>保持热爱</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    <span>持续进化</span>
                </div>

                <div className="flex flex-col items-center gap-3 opacity-40 animate-pulse">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                        Click Anywhere
                    </span>
                </div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
  };

  return (
    <motion.section 
      onClick={handleUnlock}
      className={`fixed inset-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-50 cursor-pointer ${!isLocked ? 'pointer-events-none' : ''}`}
    >
        {/* Split Curtains Background & Content */}
        <AnimatePresence>
            {isLocked && (
                <>
                    {/* Top Half - Shows the Upper Half of Content */}
                    <motion.div 
                        initial={{ y: 0 }}
                        exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
                        className="absolute top-0 left-0 w-full h-[50%] bg-[#F5F5F4] dark:bg-[#1C1917] z-10 pointer-events-none overflow-hidden"
                    >
                        {/* 
                            Content Container: 200% height.
                            Positioned top-0 to align the top of content with top of wrapper.
                            Wrapper is 50% height, so it clips the bottom half of this container.
                            Result: We see the TOP HALF of HeroContent.
                        */}
                        <div className="absolute top-0 left-0 w-full h-[200%]">
                            <HeroContent />
                        </div>
                    </motion.div>

                    {/* Bottom Half - Shows the Lower Half of Content */}
                    <motion.div 
                        initial={{ y: 0 }}
                        exit={{ y: '100%', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
                        className="absolute bottom-0 left-0 w-full h-[50%] bg-[#F5F5F4] dark:bg-[#1C1917] z-10 pointer-events-none overflow-hidden"
                    >
                        {/* 
                            Content Container: 200% height.
                            Positioned top-[-100%] (relative to wrapper height).
                            Since wrapper is 50vh, top-[-100%] means top-[-50vh].
                            This shifts the content up by 50vh, so the 50vh mark aligns with the top of this wrapper.
                            Result: We see the BOTTOM HALF of HeroContent.
                        */}
                        <div className="absolute top-[-100%] left-0 w-full h-[200%]">
                            <HeroContent />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    </motion.section>
  );
};

export default Hero;
