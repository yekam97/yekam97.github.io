'use client';

import { useEffect, useRef, useState } from 'react';
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
 * floating video rectangle. It plays a 3s preview the instant the
 * page loads, then otherwise only plays while the page is actually
 * being scrolled — forward on scroll down, backward (currentTime
 * stepped back by hand each frame, since <video> has no reliable
 * native reverse) on scroll up, so a given section keeps landing on
 * the same pose whichever direction you pass it — and scrolling stops
 * → the clip pauses within ~200ms, so it never sits there looping
 * pointlessly at rest. Shows on mobile too now (previously hidden
 * ≤640px) — much smaller there (see ScrollMascot.module.css), with
 * its own tamer hero-waypoint scale/y so it doesn't crowd the
 * single-column stacked mobile layout.
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
// large as or larger than every later waypoint. 1.68 = the previous
// 1.4 zoomed in another 20% on top.
const scaleWaypoints = [1.68, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
// On a narrow single-column mobile layout there's no empty side
// region for the hero waypoint to sit in like on desktop — it lands
// squarely in the middle of the stacked text column, so it needs to
// be small there instead of the desktop's dominant 1.68x. The other
// waypoints are already small (the mobile box itself is much smaller,
// see ScrollMascot.module.css) so they're left as-is.
const scaleWaypointsMobile = [0.55, 0.6, 1, 0.65, 0.95, 0.55, 0.85];
const rotateWaypoints = [-4, 3, -2, 4, -3, 2, -4];
// Vertical nudge, hero-only: -50px right at stop 0, settling back to
// 0 by the next waypoint (every other section is untouched). Not
// needed on mobile — the hero scale reduction above already keeps it
// out of the way there.
const yWaypoints = [-50, 0, 0, 0, 0, 0, 0];
const yWaypointsMobile = [0, 0, 0, 0, 0, 0, 0];
const stops = [0, 0.16, 0.34, 0.5, 0.66, 0.84, 1];

const springConfig = { stiffness: 55, damping: 20, mass: 0.7 };
const MOBILE_QUERY = '(max-width: 640px)';

const ScrollMascot = () => {
  const videoRef = useRef(null);
  const pauseTimer = useRef(null);
  const { scrollYProgress } = useScroll();

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastScrollY = window.scrollY;
    let reverseFrame = null;
    let lastFrameTime = null;

    // <video> has no reliable native reverse playback (negative
    // playbackRate is unsupported or flaky across browsers), so
    // reverse is faked by manually walking currentTime backwards a
    // little every animation frame instead of calling .play().
    const stopReverse = () => {
      if (reverseFrame !== null) {
        cancelAnimationFrame(reverseFrame);
        reverseFrame = null;
        lastFrameTime = null;
      }
    };

    const stepReverse = (now) => {
      if (lastFrameTime === null) lastFrameTime = now;
      const delta = (now - lastFrameTime) / 1000;
      lastFrameTime = now;
      if (isFinite(video.duration) && video.duration > 0) {
        let t = video.currentTime - delta;
        if (t < 0) t += video.duration; // wrap to the end, mirroring loop
        video.currentTime = t;
      }
      reverseFrame = requestAnimationFrame(stepReverse);
    };

    const startReverse = () => {
      if (reverseFrame !== null) return;
      video.pause();
      reverseFrame = requestAnimationFrame(stepReverse);
    };

    // Give the mascot a bit of life the moment the page loads, even
    // before the visitor scrolls at all: play forward for 3s, then
    // settle back to paused. Reuses the same pauseTimer as
    // handleScroll, so a scroll during (or right after) that window
    // just clears this timer and hands off normally instead of the
    // two fighting each other.
    video.play().catch(() => {});
    pauseTimer.current = setTimeout(() => {
      video.pause();
    }, 3000);

    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY === lastScrollY ? null : currentY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentY;

      clearTimeout(pauseTimer.current);

      // Scrolling down plays forward as usual; scrolling up plays the
      // clip backwards instead of continuing forward — so a given
      // section is always tied to the same pose in the animation
      // whichever direction you scroll past it, rather than the pose
      // drifting further every time you scroll back up over it.
      if (direction === 'up') {
        startReverse();
      } else {
        stopReverse();
        // play() returns a promise that rejects if the browser blocks
        // it — harmless here, it just means the clip stays paused.
        video.play().catch(() => {});
      }

      pauseTimer.current = setTimeout(() => {
        stopReverse();
        video.pause();
      }, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pauseTimer.current);
      stopReverse();
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
        loop
        playsInline
        preload="auto"
      />
    </motion.div>
  );
};

export default ScrollMascot;
