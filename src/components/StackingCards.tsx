'use client';

import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

interface CardProps {
  i: number;
  title: string;
  description: string;
  tags: string[];
  color: string;
  textColor: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  image: string;
  onImageClick: (image: string) => void;
}

const Card = ({ i, title, description, tags, color, textColor, progress, range, targetScale, image, onImageClick }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ 
          backgroundColor: color, 
          scale,
          top: `calc(-5vh + ${i * 25}px)`
        }}
        className="relative flex flex-col md:flex-row h-[550px] w-full max-w-[1000px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      >
        <div className="flex flex-col justify-between w-full md:w-1/2 h-full z-10 p-8 md:p-12">
          <div>
            <h2 className={`text-4xl md:text-6xl font-black mb-6 leading-none tracking-tight ${textColor} group-hover:translate-x-2 transition-transform duration-500`}>
              {title}
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed font-light ${textColor === 'text-white' ? 'text-white/90' : 'text-neutral-900/80'} group-hover:text-opacity-100 transition-opacity duration-500`}>
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className={`px-4 py-2 backdrop-blur-md border rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:scale-110 cursor-default ${
                    textColor === 'text-white' 
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                    : 'bg-black/5 border-black/10 text-neutral-900 hover:bg-black/10'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div 
            className="relative w-full md:w-1/2 h-full overflow-hidden cursor-zoom-in"
            onClick={() => onImageClick(image)}
        >
            <div className={`absolute inset-0 ${textColor === 'text-white' ? 'bg-gradient-to-l from-transparent to-black/20' : 'bg-gradient-to-l from-transparent to-white/20'} z-10 pointer-events-none`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>
      </motion.div>
    </div>
  );
};

// Premium Artistic Color Palette
// A harmonious blend of warm and cool tones, inspired by nature and modern aesthetics.
const capabilities = [
  {
    title: "滕王阁",
    description: "滕王阁是江南三大名楼之一，因王勃《滕王阁序》名扬天下。楼阁依山傍水，飞檐翘角，气势恢宏。登楼远眺，赣江奔流，城景尽收眼底。千年间几经兴废，如今依旧矗立江畔，承载着厚重的历史文脉，是南昌最具代表性的文化地标。",
    tags: ["历史名楼", "落霞孤鹜", "5A景区"],
    color: "#E76F51", // Burnt Sienna - Warm, Historic, Grand
    textColor: "text-white",
    image: "/images/tengwangge.jpg"
  },
  {
    title: "绳金塔",
    description: "绳金塔始建于唐代，是南昌现存最古老的地标之一。塔身七层八面，古朴端庄，素有“水火不侵，镇城之宝”的美誉。塔旁古街烟火气十足，美食与民俗相融，既有历史的沉静，又有生活的热闹，是南昌老城文化与烟火气的缩影。",
    tags: ["千年古塔", "祈福圣地", "豫章十景"],
    color: "#2A9D8F", // Persian Green - Ancient, Serene, Vitality
    textColor: "text-white",
    image: "/images/shengjinta.png"
  },
  {
    title: "南昌之星",
    description: "南昌之星是国内知名的巨型摩天轮，高耸于赣江之畔。缓缓转动时，可俯瞰整座城市的风光，白天视野开阔，夜晚灯光璀璨，浪漫又震撼。它不仅是休闲观景的好去处，更是南昌现代城市风貌的象征，承载着无数人的美好回忆。",
    tags: ["赣江之滨", "摩天轮", "城市夜景"],
    color: "#E9C46A", // Saffron - Bright, Energetic, Light
    textColor: "text-neutral-900",
    image: "/images/nanchangstar.jpg"
  },
  {
    title: "南昌双子塔",
    description: "南昌绿地双子塔以303米的高度矗立在红谷滩核心区，是江西地标建筑。双塔造型简洁大气，拥有超大面积的LED幕墙，夜晚灯光秀绚丽夺目，尽显现代都市的繁华与活力。它代表着南昌的高速发展，是这座城市迈向新时代的鲜明标志。",
    tags: ["现代地标", "红谷滩", "303米"],
    color: "#264653", // Charcoal - Deep, Modern, Solid
    textColor: "text-white",
    image: "/images/twintowers.jpg"
  }
];

const StackingCards = () => {
  const container = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

  return (
    <div ref={container} className="relative bg-[var(--background)]">
        <div className="h-screen flex items-center justify-center text-center sticky top-0 z-0 pointer-events-none">
             <motion.div
                style={{ opacity: titleOpacity, y: titleY }}
             >
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-[var(--foreground)] tracking-tight">
                    我的家乡
                </h2>
                <p className="text-[var(--muted-foreground)] text-lg md:text-xl max-w-2xl mx-auto px-4 font-light">
                    豫章故郡，洪都新府。带你领略南昌的古韵与新姿。
                </p>
            </motion.div>
        </div>

        {capabilities.map((project, i) => {
        const targetScale = 1 - ((capabilities.length - i) * 0.05);
        return (
            <Card
            key={i}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            onImageClick={setSelectedImage}
            />
        );
        })}
        
        {/* Image Modal */}
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
                >
                    <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 z-10 bg-black/20 rounded-full"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={selectedImage} 
                            alt="Selected View"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default StackingCards;
