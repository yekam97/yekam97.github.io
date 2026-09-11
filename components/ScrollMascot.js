'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './ScrollMascot.module.css';

/**
 * Replaces the old page-wide color wash: a large looping clip of the
 * site's own avatar character (same figure as the WhatsApp sticker)
 * that drifts across the page as you scroll, repositioning and
 * rescaling at a handful of waypoints down the page (see xWaypoints /
 * scaleWaypoints below). The page's --bg is set to the exact gray of
 * the clip's own studio backdrop, so a much bigger box (see
 * ScrollMascot.module.css) reads as part of the page instead of a
 * floating video rectangle. It only plays while the page is actually
 * being scrolled; scrolling stops → the clip pauses within ~200ms,
 * so it never sits there looping pointlessly at rest.
 */
const xWaypoints = ['4vw', '58vw', '6vw', '60vw', '8vw', '56vw', '4vw'];
const scaleWaypoints = [0.85, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
const rotateWaypoints = [-4, 3, -2, 4, -3, 2, -4];
const stops = [0, 0.16, 0.34, 0.5, 0.66, 0.84, 1];

const springConfig = { stiffness: 55, damping: 20, mass: 0.7 };

const ScrollMascot = () => {
  const videoRef = useRef(null);
  const pauseTimer = useRef(null);
  const { scrollYProgress } = useScroll();

  const x = useSpring(useTransform(scrollYProgress, stops, xWaypoints), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, stops, scaleWaypoints), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, stops, rotateWaypoints), springConfig);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      // play() returns a promise that rejects if the browser blocks
      // it — harmless here, it just means the clip stays paused.
      video.play().catch(() => {});
      clearTimeout(pauseTimer.current);
      pauseTimer.current = setTimeout(() => {
        video.pause();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pauseTimer.current);
    };
  }, []);

  return (
    <motion.div
      className={styles.mascotWrap}
      style={{ left: x, scale, rotate }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={styles.mascotVideo}
        src="/videos/mascot-animation.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />
    </motion.div>
  );
};

export default ScrollMascot;
