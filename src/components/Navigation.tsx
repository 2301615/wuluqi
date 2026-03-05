'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, User, Briefcase, BookOpen, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'about', label: '关于我', icon: <User className="w-5 h-5" /> },
    { id: 'projects', label: '我的作品', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'blog', label: '成长日志', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'footer', label: '联系我', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed top-8 right-8 z-50 p-4 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg transition-all duration-300 ${scrolled ? 'scale-100' : 'scale-110'}`}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Menu className="w-6 h-6 text-neutral-900 dark:text-white" />
      </motion.button>

      {/* Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-white/5 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-black z-40 shadow-2xl border-l border-neutral-100 dark:border-neutral-800 flex flex-col justify-center px-12"
            >
              <ul className="space-y-8">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="group flex items-center gap-4 text-2xl font-light text-neutral-400 hover:text-black dark:hover:text-white transition-colors w-full text-left"
                    >
                      <span className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 transition-colors">
                        {item.icon}
                      </span>
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-12 left-12 right-12 text-xs text-neutral-300 dark:text-neutral-700 uppercase tracking-widest text-center">
                Navigation
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
