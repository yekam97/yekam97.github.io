'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './ScrollMascot.module.css';

/**
 * Replaces the old page-wide color wash: a large looping clip of the
 * site's own avatar character (same figure as the WhatsApp sticker)
 * that drifts across the page as you scroll, repositioning, rescaling
 * AND changing pose (video currentTime) at a handful of waypoints —
 * one per real section of the page, measured from the DOM (see
 * useSectionStops below) rather than guessed fixed percentages, so
 * the mapping stays correct however tall any given section actually
 * renders. The page's --bg is set to the exact gray of the clip's own
 * studio backdrop, so a big box (see ScrollMascot.module.css) reads
 * as part of the page instead of a floating video rectangle.
 *
 * Pose tracking: currentTime is driven DIRECTLY by scroll position
 * (videoTimeWaypoints below), the same way x/scale/rotate already
 * are — not by imperatively playing/pausing/reversing in response to
 * scroll events. That makes it fully deterministic: a given scroll
 * position always shows the same pose, whichever direction (or
 * speed) you scrolled to reach it, and there's no native-<video>
 * reverse-playback workaround needed at all. A short intro (1s→3s,
 * exactly Hero's own range below) plays natively on load for a bit of
 * life before the first scroll; the moment scrollYProgress actually
 * changes, the scroll-driven binding takes over.
 */
const SECTION_IDS = ['hero', 'skills', 'portfolio', 'experiencia', 'roles', 'contacto'];

// One waypoint per section start (measured from the DOM) plus a final
// one for the very bottom of the page — 7 values, matching
// SECTION_IDS.length + 1.
//
// Video pose per section (10s clip: pointing → idle/dance → thumbs
// up), set directly by request. Each value is where that section's
// OWN scroll range ends — which is the same point as the next
// section's start, so e.g. Hero's "1s → 2.8s" and Skills' "→ 4s" are
// really just two ends of one continuous 1 → 2.8 → 4 chain:
//   Hero (1):          1s   → 2.8s
//   Skills (2):        2.8s → 4s
//   Portfolio (3):     4s        (unchanged, already lines up with Skills' end)
//   Experiencia (4):   6s
//   Roles/Estudios (5):8s
//   Contacto (6):      10s       (the clip's own last frame — thumbs up)
//   Page end:          10s       (holds the thumbs-up finale to the bottom)
const videoTimeWaypoints = [1, 2.8, 4, 6, 8, 10, 10];

// Hero sits on the RIGHT — beside "INDUSTRIAL" and above the "Títulos
// y certificaciones" stat — instead of the left, so it never overlaps
// the name/headline/description column. Plain numbers (vw units,
// reattached after the spring below) — NOT unit strings like '58vw':
// springing a unit string directly silently drops the unit and
// Framer re-adds "px" to the bare number instead.
const xWaypoints = [58, 58, 6, 60, 8, 56, 4];
// Hero gets the biggest scale of the whole journey — it's the first
// thing a visitor sees, so it should read as large as or larger than
// every later waypoint.
const scaleWaypoints = [1.68, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
// On a narrow single-column mobile layout there's no empty side
// region for the hero waypoint to sit in like on desktop — it lands
// squarely in the middle of the stacked text column, so it needs a
// gentler scale there than the desktop's dominant 1.68x.
const scaleWaypointsMobile = [0.75, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
const rotateWaypoints = [-4, 3, -2, 4, -3, 2, -4];
// Vertical nudge, hero-only: -50px right at the hero waypoint,
// settling back to 0 by the next one (every other section is
// untouched). Not needed on mobile.
const yWaypoints = [-50, 0, 0, 0, 0, 0, 0];
const yWaypointsMobile = [0, 0, 0, 0, 0, 0, 0];

// Fallback stops, used only until the real section positions have
// been measured once (see useSectionStops) — close enough to avoid
// any visible jump when the real measurement lands a frame later.
const fallbackStops = [0, 0.16, 0.34, 0.5, 0.66, 0.84, 1];

const springConfig = { stiffness: 55, damping: 20, mass: 0.7 };
// Tighter/snappier than springConfig above: the video's own time
// should track scroll closely rather than float, or a fast scroll
// would leave the pose visibly lagging behind the section on screen.
const timeSpringConfig = { stiffness: 260, damping: 32, mass: 0.6 };
const MOBILE_QUERY = '(max-width: 640px)';

/**
 * Measures where each section in SECTION_IDS actually starts on the
 * page (as a 0-1 fraction of total scrollable height) and keeps that
 * up to date across resizes and layout shifts (e.g. the "Ver
 * trayectoria completa" accordion, images/fonts finishing load), so
 * every waypoint below always lines up with the section it names
 * instead of a guessed fixed percentage that could drift.
 */
function useSectionStops() {
  const [stops, setStops] = useState(fallbackStops);

  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const next = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        // The last section's own content is often taller than the
        // viewport space left below it, which can push its offsetTop
        // PAST the max scrollable distance (scrollYProgress can never
        // exceed 1) — clamped to 0.995 so the final "page end" point
        // pushed below always has a sliver of scroll room after it,
        // instead of both landing on/past 1 and collapsing together.
        return Math.min(0.995, Math.max(0, el.offsetTop / scrollable));
      });
      next.push(1);

      // Safety net: useTransform's input range must be strictly
      // increasing (in the unlikely event two sections measure to the
      // same clamped fraction).
      for (let i = 1; i < next.length; i++) {
        if (next[i] <= next[i - 1]) next[i] = next[i - 1] + 0.001;
      }

      setStops((prev) => (prev.every((v, i) => Math.abs(v - next[i]) < 0.001) ? prev : next));
    };

    measure();
    // Layout can still be settling (fonts, images, initial
    // whileInView reveals) right after mount — remeasure shortly
    // after in case the first pass ran too early.
    const settleTimer = setTimeout(measure, 500);

    window.addEventListener('resize', measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener('resize', measure);
      resizeObserver.disconnect();
    };
  }, []);

  return stops;
}

const ScrollMascot = () => {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const stops = useSectionStops();

  // Starts false (desktop-shaped) and corrects itself right after
  // mount — this is a decorative, aria-hidden element, so a one-frame
  // mismatch before the media query is read is harmless.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // xWaypoints are sprung as plain numbers (see comment above), then
  // the "vw" unit is reattached afterwards so the actual CSS `left`
  // truly scales with viewport width.
  const xNumber = useSpring(useTransform(scrollYProgress, stops, xWaypoints), springConfig);
  const x = useTransform(xNumber, (v) => `${v}vw`);
  const scale = useSpring(useTransform(scrollYProgress, stops, isMobile ? scaleWaypointsMobile : scaleWaypoints), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, stops, rotateWaypoints), springConfig);
  const y = useSpring(useTransform(scrollYProgress, stops, isMobile ? yWaypointsMobile : yWaypoints), springConfig);

  const videoTime = useSpring(useTransform(scrollYProgress, stops, videoTimeWaypoints), timeSpringConfig);

  // Drives the <video> element's currentTime from the scroll-linked
  // videoTime motion value above — this only fires when scrollYProgress
  // (and therefore videoTime) actually changes, so it never fights
  // the on-load intro below, which plays natively at scroll 0.
  useMotionValueEvent(videoTime, 'change', (latest) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;
    // Skip once the intro has already landed here on its own —
    // avoids a redundant seek fighting the intro's native playback.
    if (Math.abs(video.currentTime - latest) < 0.02) return;
    video.currentTime = Math.max(0, Math.min(video.duration, latest));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // A short intro plays natively the instant the page loads, before
    // any scroll: 1s → 2.8s, exactly Hero's own defined range (1.8s of
    // content, so 1800ms of real-time playback at 1x), so there is no
    // snap when the scroll-driven binding above takes over.
    let cancelled = false;
    const startIntro = () => {
      if (cancelled) return;
      video.currentTime = 1;
      video.play().catch(() => {});
      setTimeout(() => {
        if (!cancelled) video.pause();
      }, 1800);
    };

    if (video.readyState >= 1) {
      startIntro();
    } else {
      video.addEventListener('loadedmetadata', startIntro, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', startIntro);
    };
  }, []);

  return (
    <motion.div
      className={styles.mascotWrap}
      style={{ left: x, scale, rotate, y }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={styles.mascotVideo}
        src="/videos/mascot-animation.mp4"
        muted
        playsInline
        preload="auto"
      />
    </motion.div>
  );
};

export default ScrollMascot;
