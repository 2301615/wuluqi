'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Calendar, Lightbulb, ArrowUpRight, X } from 'lucide-react';

const TiltCard = ({ children, className, glowColor, onClick }: { children: React.ReactNode, className?: string, glowColor: string, onClick?: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
  
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect();
  
      const width = rect.width;
      const height = rect.height;
  
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
  
      x.set(xPct);
      y.set(yPct);
    };
  
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
  
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative ${className}`}
      >
        <div 
            className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
            style={{ backgroundColor: glowColor }}
        />
        <div style={{ transform: "translateZ(50px)" }}>
            {children}
        </div>
      </motion.div>
    );
  };

const Blog = () => {
  const [titleEffect, setTitleEffect] = useState(false);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const handleTitleClick = () => {
    setTitleEffect(true);
    setTimeout(() => setTitleEffect(false), 1000);
  };

  const posts = [
    {
      id: 1,
      title: "我的 AI 学习之路：从零开始",
      date: "2024-03-01",
      summary: "记录我是如何踏入 AI 这个充满无限可能的领域的，以及最初的迷茫与探索。",
      tag: "学习笔记",
      // Dopamine Pink
      color: "bg-pink-500",
      accent: "text-pink-500",
      bgGradient: "from-pink-500/10 to-transparent",
      tagBg: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300",
      modalContent: {
        type: 'image',
        src: '/images/redbook_qr.jpg', 
        alt: '小红书二维码'
      }
    },
    {
      id: 2,
      title: "网站搭建踩坑记录：Next.js 与 Framer Motion",
      date: "2024-03-05",
      summary: "在这个网站的开发过程中，我遇到了一些挑战，尤其是动画性能优化方面。",
      tag: "技术心得",
      // Dopamine Purple
      color: "bg-purple-500",
      accent: "text-purple-500",
      bgGradient: "from-purple-500/10 to-transparent",
      tagBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
      modalContent: {
        type: 'text',
        title: '踩坑总结',
        content: [
            { title: '1. 一开始太贪效果', text: '起初看见了交互很华丽的3d网站，过于自信想直接做 3D。想直接做 3D、交互、复杂动画，结果越写越乱，页面还容易崩。' },
            { title: '2. Prompt 写不清楚', text: '只说“帮我做网站”，不说结构、板块、风格，AI 给的东西完全不对。' },
            { title: '3. 不懂基础概念，全靠猜', text: 'Hero、Block、About、导航这些词不知道啥意思，边做边懵。' },
            { title: '4. 总想一步到位', text: '一会儿改南昌主题，一会儿改风格，一会儿加内容，来回返工。' },
            { title: '5. 复制代码直接用，不理解', text: '拷过来报错、黑屏、样式乱，不知道哪里改。' },
            { separator: true },
            { title: '总结：', text: '' },
            { title: '1.', text: '零基础别一上来就上复杂特效，先把结构跑通。' },
            { title: '2.', text: '描述越模糊，结果越垃圾，要给框架、给例子。' },
            { title: '3.', text: '先搞懂名词，再动手写代码，少走90%弯路。' },
            { title: '4.', text: '先做最简版跑通，再慢慢加功能，不要边建边改需求。' },
            { title: '5.', text: '只复制不理解，永远只会拼积木，不会修问题。' }
        ]
      }
    },
    {
      id: 3,
      title: "关于未来的思考：AI 与人类创造力",
      date: "2024-03-10",
      summary: "AI 不会取代人类，而是赋予人类更强的创造力。写给自己的一封信。",
      tag: "随笔",
      // Dopamine Teal
      color: "bg-teal-500",
      accent: "text-teal-500",
      bgGradient: "from-teal-500/10 to-transparent",
      tagBg: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
      modalContent: {
        type: 'text-center',
        content: [
            "AI在加速世界，而人类负责感受世界。",
            "工具可以生成答案，却无法生出心动与热爱。",
            "",
            "真正的创造力，从来不是技巧，",
            "是经历、是情绪、是独一无二的思考。",
            "未来不必害怕被替代，",
            "守住内心的温度与真诚，",
            "便是人类最不可复制的力量。",
            "",
            "生命因希望而常怀感动。"
        ]
      }
    }
  ];

  return (
    <section id="blog" className="min-h-screen w-full flex items-center justify-center py-32 relative bg-[var(--background)] overflow-hidden">
      {/* Background blobs removed for cleaner look */}
      <div className="absolute inset-0 pointer-events-none">
          {/* No blobs */}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.h2 
            onClick={handleTitleClick}
            className="text-4xl md:text-6xl font-bold mb-6 cursor-pointer relative inline-block select-none tracking-tight text-[var(--foreground)]"
            whileHover={{ scale: 1.05 }}
          >
            成长日志
            {titleEffect && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-yellow-200/50 blur-xl rounded-full -z-10"
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.h2>
          <p className="text-[var(--muted-foreground)] flex items-center justify-center gap-2 font-medium tracking-widest uppercase text-sm">
            <Lightbulb className="w-4 h-4 text-yellow-500" /> Growth Log
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
            >
                {/* Updated Card Style: Glassmorphism */}
                <TiltCard 
                    onClick={() => setActiveModal(post.id)}
                    glowColor={post.color}
                    className="h-full bg-[var(--card)]/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 border border-white/40 dark:border-white/10 group cursor-pointer hover:border-white/60 dark:hover:border-white/20 relative overflow-hidden"
                >
                    {/* Subtle Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-50" />

                    <div className={`absolute inset-0 bg-gradient-to-br ${post.bgGradient} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <span className={`inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${post.tagBg} group-hover:scale-105 transition-transform duration-300`}>
                                {post.tag}
                            </span>
                            <motion.div
                                className={`p-2 rounded-full ${post.tagBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                whileHover={{ rotate: 45 }}
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)] group-hover:translate-x-1 transition-transform duration-300">
                            {post.title}
                        </h3>
                        
                        <p className="text-[var(--muted-foreground)] text-sm mb-8 leading-relaxed line-clamp-3 flex-grow group-hover:text-[var(--foreground)] transition-colors">
                            {post.summary}
                        </p>
                    </div>
                </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-neutral-900 rounded-[2rem] p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl relative border border-white/20"
                >
                    <button 
                        onClick={() => setActiveModal(null)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-neutral-500" />
                    </button>

                    {/* Dynamic Modal Content */}
                    {(() => {
                        const post = posts.find(p => p.id === activeModal);
                        if (!post?.modalContent) return null;

                        if (post.modalContent.type === 'image') {
                            return (
                                <div className="flex flex-col items-center gap-6 py-8">
                                    <h3 className="text-xl font-bold text-center">关注我的小红书</h3>
                                    <div className="w-64 h-64 bg-neutral-100 rounded-xl overflow-hidden relative">
                                        {/* Use img tag for QR code */}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={post.modalContent.src as string} 
                                            alt={post.modalContent.alt as string}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm text-neutral-500">扫码探索更多精彩内容</p>
                                </div>
                            );
                        }

                        if (post.modalContent.type === 'text') {
                            const content = post.modalContent.content as any[];
                            return (
                                <div className="space-y-6 py-4">
                                    <h3 className="text-2xl font-bold mb-6">{post.modalContent.title}</h3>
                                    <div className="space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                        {content.map((item, idx) => (
                                            item.separator ? <hr key={idx} className="my-6 border-neutral-200 dark:border-neutral-700" /> :
                                            <div key={idx}>
                                                {item.title && <strong className="block text-neutral-900 dark:text-white mb-1">{item.title}</strong>}
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (post.modalContent.type === 'text-center') {
                            const content = post.modalContent.content as string[];
                            return (
                                <div className="flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 py-8">
                                    {content.map((line, idx) => (
                                        <p key={idx} className={`text-lg font-medium ${!line ? 'h-4' : 'text-neutral-800 dark:text-neutral-200'}`}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            );
                        }
                    })()}
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
