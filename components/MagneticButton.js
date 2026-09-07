'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Subtle "magnetic" hover: the element gently follows the cursor within
// its own bounds and snaps back with a spring once the pointer leaves.
export default function MagneticButton({ children, className, style, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 160, damping: 14, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Renders as a real <button> when there's no href (e.g. it just opens
  // a modal) so it stays keyboard-focusable and reads correctly to
  // assistive tech, instead of an anchor with nothing to navigate to.
  const Tag = props.href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      type={props.href ? undefined : 'button'}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
