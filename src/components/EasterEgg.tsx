'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

const EasterEgg = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        className="fixed bottom-8 left-8 z-40 opacity-20 hover:opacity-100 transition-opacity duration-500 group"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <Heart className="w-3 h-3 text-neutral-400 group-hover:text-pink-500 transition-colors" />
        </div>
      </motion.button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 left-8 z-50 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-2xl border border-pink-100 dark:border-neutral-700 max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-50 dark:bg-pink-900/30 rounded-full">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm mb-1">
                  给坚持的你
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  每一步成长都算数。你比想象中更强大，继续加油！🌱
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-neutral-800 transform rotate-45 border-b border-r border-pink-100 dark:border-neutral-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;
