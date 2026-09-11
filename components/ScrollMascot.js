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
 * floating video rectangle. It plays a 2s preview the instant the
 * page loads, then otherwise only plays while the page is actually
 * being scrolled; scrolling stops → the clip pauses within ~200ms,
 * so it never sits there looping pointlessly at rest.
 */
// Hero (stop 0) sits on the RIGHT — beside "INDUSTRIAL" and above the
// "Títulos y certificaciones" stat — instead of the left, so it never
// overlaps the name/headline/description column. Plain numbers (vw
// units, reattached after the spring below) — NOT unit strings like
// '58vw': springing a unit string directly silently drops the unit
// and Framer re-adds "px" to the bare number instead, so the mascot
// was actually drifting inside a fixed few-dozen-px band regardless
// of viewport width this whole time, never truly reaching the vw
// position the waypoint named.
const xWaypoints = [58, 58, 6, 60, 8, 56, 4];
// The hero (stop 0, page load) gets the biggest scale of the whole
// journey — it's the first thing a visitor sees, so it should read as
// large as or larger than every later waypoint.
const scaleWaypoints = [1.4, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
const rotateWaypoints = [-4, 3, -2, 4, -3, 2, -4];
const stops = [0, 0.16, 0.34, 0.5, 0.66, 0.84, 1];

const springConfig = { stiffness: 55, damping: 20, mass: 0.7 };

const ScrollMascot = () => {
  const videoRef = useRef(null);
  const pauseTimer = useRef(null);
  const { scrollYProgress } = useScroll();

  // xWaypoints are sprung as plain numbers (see comment above), then
  // the "vw" unit is reattached afterwards so the actual CSS `left`
  // truly scales with viewport width.
  const xNumber = useSpring(useTransform(scrollYProgress, stops, xWaypoints), springConfig);
  const x = useTransform(xNumber, (v) => `${v}vw`);
  const scale = useSpring(useTransform(scrollYProgress, stops, scaleWaypoints), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, stops, rotateWaypoints), springConfig);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Give the mascot a bit of life the moment the page loads, even
    // before the visitor scrolls at all: play for 2s, then settle
    // back to paused. Reuses the same pauseTimer as handleScroll, so
    // if a scroll happens during (or right after) that window it just
    // clears this timer and takes over normally instead of fighting it.
    video.play().catch(() => {});
    pauseTimer.current = setTimeout(() => {
      video.pause();
    }, 2000);

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
