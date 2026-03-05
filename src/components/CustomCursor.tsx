'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Fluid motion configuration
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail effect with higher damping for fluid lag
  const trailSpringConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  // Scale effect for interaction
  const scale = useSpring(1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => {
        scale.set(0.8);
        document.body.classList.add('cursor-clicked');
    };

    const handleMouseUp = () => {
        scale.set(1);
        document.body.classList.remove('cursor-clicked');
    };

    const handleHoverStart = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .cursor-pointer')) {
            setIsHovering(true);
            scale.set(1.5);
        }
    };

    const handleHoverEnd = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], .cursor-pointer')) {
            setIsHovering(false);
            scale.set(1);
        }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [cursorX, cursorY, scale]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fluid Trail - Frosted Glass Effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] mix-blend-exclusion backdrop-blur-md"
        style={{
          translateX: trailXSpring,
          translateY: trailYSpring,
          x: '-50%',
          y: '-50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          scale: scale
        }}
      />

      {/* Core Cursor - Sharp & Precise */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%'
        }}
      />
    </>
  );
};

export default CustomCursor;
