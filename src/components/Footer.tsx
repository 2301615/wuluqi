'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Mail, Sparkles, Send, X } from 'lucide-react';

const Footer = () => {
  const [showFinalEasterEgg, setShowFinalEasterEgg] = useState(false);
  const [showWeChatModal, setShowWeChatModal] = useState(false);

  const handleCTAClick = () => {
    setShowFinalEasterEgg(true);
    setTimeout(() => setShowFinalEasterEgg(false), 5000);
  };

  return (
    <footer id="footer" className="w-full flex flex-col items-center justify-center py-32 bg-[var(--background)] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Tagline */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              保持热爱，持续进化。
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto">
              期待与你在 AI 的星辰大海中相遇，共同见证成长的力量。
            </p>
          </div>

          {/* CTA Button */}
          <div className="relative inline-block">
            <motion.button
              onClick={handleCTAClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-lg font-bold shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 transition-all duration-500 relative overflow-hidden group"
            >
              <span className="relative z-10">已探索完毕，期待下次相遇</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>

            <AnimatePresence>
              {showFinalEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: -80 }}
                  exit={{ opacity: 0, scale: 0.8, y: -100 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 w-max bg-[var(--card)] border border-[var(--border)] shadow-2xl px-8 py-4 rounded-2xl z-50 flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <p className="text-[var(--foreground)] font-medium">
                    ✨ 感谢你的阅读，愿一切美好与你不期而遇。
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-4 pt-12 border-t border-[var(--border)]">
            <div className="flex items-center gap-6">
              <motion.a 
                href="mailto:1109316483@qq.com" 
                className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors relative group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                    className="absolute inset-0 bg-blue-500/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Mail className="w-4 h-4 relative z-10" />
                <span className="text-sm font-medium relative z-10">1109316483@qq.com</span>
              </motion.a>
              <div className="w-1 h-1 bg-[var(--muted-foreground)] rounded-full opacity-30" />
              <motion.button 
                onClick={() => setShowWeChatModal(true)}
                className="text-sm text-[var(--muted-foreground)] font-medium flex items-center gap-2 hover:text-[var(--foreground)] transition-colors cursor-pointer relative group"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                    className="absolute inset-0 bg-green-500/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Send className="w-4 h-4 relative z-10" />
                <span className="relative z-10">微信联系方式</span>
              </motion.button>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-4 uppercase tracking-widest opacity-50">
              Built with AI & Passion • © 2024
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Graphic */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-neutral-200/50 dark:from-neutral-800/50 to-transparent blur-3xl opacity-50" />
      </div>

      {/* WeChat Modal */}
      <AnimatePresence>
        {showWeChatModal && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowWeChatModal(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-neutral-900 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative border border-white/20 flex flex-col items-center gap-6"
                >
                    <button 
                        onClick={() => setShowWeChatModal(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-neutral-500" />
                    </button>

                    <h3 className="text-xl font-bold text-center mt-2">扫码添加微信</h3>
                    
                    <div className="w-64 h-64 bg-neutral-100 rounded-xl overflow-hidden relative">
                        {/* Placeholder for WeChat QR Code */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src="/images/wechat_qr.jpg" 
                            alt="微信二维码"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <p className="text-sm text-neutral-500 text-center px-4">
                        请备注来意，方便通过。<br/>期待与您交流 AI 与技术。
                    </p>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
