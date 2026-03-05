'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChefHat, Smile, Brain, Code, Sparkles, X, ChevronRight, ChevronLeft } from 'lucide-react';

const About = () => {
  const [showCookingEasterEgg, setShowCookingEasterEgg] = useState(false);
  const [showFoodGallery, setShowFoodGallery] = useState(false);
  const [showPeaceDoves, setShowPeaceDoves] = useState(false);
  const [peaceKey, setPeaceKey] = useState(0);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const peaceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  const foodImages = [
    '/images/food1.jpg',
    '/images/food2.jpg',
    '/images/food3.jpg',
    '/images/food4.jpg',
    '/images/food5.jpg',
    '/images/food6.jpg',
    '/images/food7.jpg'
  ];

  const handleCookingClick = () => {
    // Open Gallery instead of just showing the egg
    setShowFoodGallery(true);
    // Keep the egg effect for fun
    setShowCookingEasterEgg(true);
    setTimeout(() => setShowCookingEasterEgg(false), 3000);
  };

  const handlePeaceClick = () => {
    setPeaceKey(prev => prev + 1);
    setShowPeaceDoves(true);
    
    if (peaceTimerRef.current) {
      clearTimeout(peaceTimerRef.current);
    }
    
    peaceTimerRef.current = setTimeout(() => {
      setShowPeaceDoves(false);
    }, 5000);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentFoodIndex((prev) => (prev + 1) % foodImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentFoodIndex((prev) => (prev - 1 + foodImages.length) % foodImages.length);
  };

  // Dopamine Color Palette
  const tags = [
    { icon: <Smile className="w-4 h-4" />, text: "慢热", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300", glow: "hover:shadow-pink-500/50" },
    { icon: <Brain className="w-4 h-4" />, text: "幽默", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300", glow: "hover:shadow-purple-500/50" },
    { icon: <Code className="w-4 h-4" />, text: "专注", color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300", glow: "hover:shadow-teal-500/50" },
    { icon: <Sparkles className="w-4 h-4" />, text: "爱思考", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300", glow: "hover:shadow-yellow-500/50" },
  ];

  const textVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section id="about" ref={containerRef} className="min-h-screen w-full flex items-center justify-center py-20 relative overflow-hidden bg-[var(--background)]">
      {/* Background blobs removed for cleaner look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Placeholder for potential subtle texture if needed later */}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          style={{ opacity }}
          // Changed layout to items-start to allow offsetting
          className="grid md:grid-cols-2 gap-16 items-start"
        >
            {/* Left Column: Big Typographic Statement */}
            {/* Offset slightly down or keep at top, let's keep it at top for diagonal effect with the right card */}
            <div className="relative md:mt-0">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="block text-sm font-bold tracking-[0.3em] text-orange-600 mb-4 uppercase">
                        Who I Am
                    </span>
                    <motion.h2 
                        className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-6 text-neutral-900 dark:text-white mix-blend-exclusion cursor-default"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {["HELLO", "WORLD."].map((word, wordIndex) => (
                            <span key={wordIndex} className="block">
                                {word.split("").map((char, charIndex) => (
                                    <motion.span
                                        key={charIndex}
                                        className="inline-block hover:text-orange-500 transition-colors duration-300"
                                        variants={{
                                            hidden: { y: 50, opacity: 0 },
                                            visible: { y: 0, opacity: 1 }
                                        }}
                                        transition={{
                                            type: "spring",
                                            damping: 10,
                                            stiffness: 100,
                                            delay: wordIndex * 0.2 + charIndex * 0.05
                                        }}
                                        whileHover={{ 
                                            scale: 1.2, 
                                            rotate: (charIndex % 2 === 0 ? 5 : -5) * (wordIndex + 1),
                                            y: -10
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </motion.h2>
                    <div className="w-24 h-2 bg-neutral-900 dark:bg-white mb-8" />
                </motion.div>
            </div>

            {/* Right Column: Content Card - Glassmorphism Enhanced */}
            {/* Added top margin to push it down for diagonal layout */}
            <div className="md:mt-32 bg-[var(--card)]/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-50" />
                
                <div className="relative z-10 space-y-8">
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                    >
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-[var(--foreground)]">
                            <motion.span 
                                className="inline-block font-serif italic font-bold text-3xl mb-2 bg-gradient-to-r from-neutral-800 via-orange-500 to-neutral-800 dark:from-white dark:via-orange-400 dark:to-white bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient cursor-pointer"
                            >
                                {"生命应希望而常怀感动。".split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            className="inline-block"
                                            whileHover={{ 
                                                y: -6, 
                                                scale: 1.1,
                                                rotate: i % 2 === 0 ? 5 : -5,
                                                color: "#F97316",
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                        >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.span>
                            <br/><br/>
                            从铁路到餐饮，再到现在的互联网，我习惯在不同领域里不断突破自己。
                            <br/><br/>
                            热爱生活、擅长复盘与规划，
                            如今在深耕AI技术学习，
                            把每一段经历，都变成向前走的底气。
                            <br/><br/>
                            我的愿望是
                            <motion.span
                                onClick={handlePeaceClick}
                                className="inline-block text-4xl md:text-5xl font-black text-blue-500 cursor-pointer mx-2 hover:text-blue-600 transition-colors"
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                世界和平
                            </motion.span>
                            ！
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                        className="flex flex-wrap gap-3"
                    >
                        {tags.map((tag, index) => (
                        <motion.span 
                            key={index} 
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all cursor-default shadow-sm ${tag.color} ${tag.glow}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tag.icon}
                            {tag.text}
                        </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                        className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-100 dark:border-neutral-800"
                    >
                        <div className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
                                Core Goal
                            </h3>
                            <p className="font-medium text-[var(--foreground)]">
                                进入 AI 领域，持续学习，持续成长。
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
                                Hobby
                            </h3>
                            <p className="font-medium text-[var(--foreground)]">
                                <motion.span 
                                    onClick={handleCookingClick}
                                    className="inline-block cursor-pointer text-rose-500 hover:text-rose-600 underline decoration-2 underline-offset-4 relative"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    研究制作<span className="text-xl font-bold mx-1">美食</span>
                                    <AnimatePresence>
                                        {showCookingEasterEgg && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 10, scale: 0.5, rotate: -10 }}
                                            animate={{ opacity: 1, y: -60, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, y: -80, scale: 0.8 }}
                                            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-50"
                                        >
                                            <span className="text-4xl">🍳</span>
                                        </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
      </div>

      {/* Food Gallery Modal */}
      <AnimatePresence>
        {showFoodGallery && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFoodGallery(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            >
                    <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center">
                        <button 
                            onClick={() => setShowFoodGallery(false)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center p-4">
                             <AnimatePresence mode='wait'>
                                <motion.img 
                                    key={currentFoodIndex}
                                    src={foodImages[currentFoodIndex]}
                                    alt={`Food ${currentFoodIndex + 1}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                                    onClick={nextImage} // Click image to next
                                />
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                        {foodImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentFoodIndex(idx); }}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentFoodIndex ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                    <p className="text-white/50 text-sm mt-2 font-mono">
                        {currentFoodIndex + 1} / {foodImages.length}
                    </p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      {/* Peace Doves Animation */}
      <AnimatePresence mode="popLayout">
        {showPeaceDoves && (
            <div key={peaceKey} className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            opacity: 0, 
                            x: `${Math.random() * 100}vw`, 
                            y: "110vh",
                            scale: 0.5 + Math.random() * 0.8
                        }}
                        animate={{ 
                            opacity: [0, 1, 1, 0], 
                            x: `${Math.random() * 100}vw`, 
                            y: "-20vh",
                            rotate: Math.random() * 40 - 20
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 4 + Math.random() * 3, 
                            ease: "easeOut",
                            delay: Math.random() * 1.5
                        }}
                        className="absolute text-6xl drop-shadow-2xl filter"
                    >
                        🕊️
                    </motion.div>
                ))}
            </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
