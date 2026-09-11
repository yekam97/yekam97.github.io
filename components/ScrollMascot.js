'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import styles from './ScrollMascot.module.css';

/**
 * Replaces the old page-wide color wash: a large looping clip of the
 * site's own avatar character (same figure as the WhatsApp sticker)
 * that drifts across the page as you scroll, repositioning and
 * rescaling continuously at a handful of waypoints — one per real
 * section of the page, measured from the DOM (see useSectionStops
 * below) rather than guessed fixed percentages, so the mapping stays
 * correct however tall any given section actually renders. The
 * page's --bg is set to the exact gray of the clip's own studio
 * backdrop, so a big box (see ScrollMascot.module.css) reads as part
 * of the page instead of a floating video rectangle.
 *
 * Pose tracking is intentionally NOT continuous like position/scale
 * are: binding currentTime directly to scroll (scrubbing) means
 * seeking the video on every scroll tick, and browsers don't seek
 * compressed video smoothly frame-by-frame — it reads as choppy/
 * stuttery no matter how tight the spring is. Instead, the video
 * tracks which SECTION is active (useActiveSection below): entering a
 * new section seeks ONCE to that section's start time, then plays
 * forward natively (smooth, normal video playback) through to the
 * next section's time and holds there — scrolling around *within* a
 * section does nothing to it at all. Scrolling back to an earlier
 * section replays that section's own range the same way.
 */
const SECTION_IDS = ['hero', 'skills', 'portfolio', 'experiencia', 'roles', 'contacto'];

// One time per section (10s clip: pointing → idle/dance → thumbs up),
// set directly by request — each section plays natively from its own
// value to the NEXT section's value the moment it becomes active,
// then holds on that last frame:
//   Hero:            1s   → 2.8s
//   Skills:          2.8s → 4s
//   Portfolio:       4s   → 6s
//   Experiencia:     6s   → 8s
//   Roles/Estudios:  8s   → 10s
//   Contacto:        10s (the clip's own last frame — thumbs up, holds)
const videoTimeWaypoints = [1, 2.8, 4, 6, 8, 10];

// Hero sits on the RIGHT — beside "INDUSTRIAL" and above the "Títulos
// y certificaciones" stat — instead of the left, so it never overlaps
// the name/headline/description column. Plain numbers (vw units,
// reattached after the spring below) — NOT unit strings like '58vw':
// springing a unit string directly silently drops the unit and
// Framer re-adds "px" to the bare number instead.
const xWaypoints = [58, 58, 6, 60, 8, 56, 4];
// Mobile's own x drift — kept well clear of the far right edge, which
// the fixed WhatsApp button (Sticker.js) permanently occupies in that
// same bottom-right corner the desktop hero waypoint (58vw) sits in;
// on mobile, bottom-anchored the same way for every section (see
// ScrollMascot.module.css), that combination collided with the button
// at every single scroll position, not just the hero. Re-measured
// (getBoundingClientRect vs. the button's own rect, at every section)
// after the mobile box was later zoomed in 80% — a bigger box needs
// more clearance from the same right edge, so hero/skills/experiencia
// (the three with the highest mobile scale × rightmost x) got pulled
// in further; confirmed zero overlap at every section afterward.
const xWaypointsMobile = [26, 22, 12, 20, 12, 40, 8];
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
const MOBILE_QUERY = '(max-width: 640px)';

/**
 * Measures where each section in SECTION_IDS actually starts on the
 * page (as a 0-1 fraction of total scrollable height) and keeps that
 * up to date across resizes and layout shifts (e.g. the "Ver
 * trayectoria completa" accordion, images/fonts finishing load), so
 * every waypoint below always lines up with the section it names
 * instead of a guessed fixed percentage that could drift. Drives the
 * continuous x/scale/rotate/y positioning below.
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

/**
 * Tracks which SECTION the viewport is currently past (0 = Hero, 1 =
 * Skills, ...), updating only when that index actually changes — not
 * on every scroll pixel — so the video effect below only fires on
 * real section transitions.
 */
function useActiveSection() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const sectionEls = SECTION_IDS.map((id) => document.getElementById(id));

    const compute = () => {
      const y = window.scrollY + window.innerHeight * 0.3; // a little past the very top edge feels more natural than the exact pixel boundary
      let next = 0;
      for (let i = 0; i < sectionEls.length; i++) {
        if (sectionEls[i] && sectionEls[i].offsetTop <= y) next = i;
      }
      // The lookahead above (and the last section's own content often
      // being taller than the viewport space left below it) can mean
      // its offsetTop is never actually <= y, even at max scroll —
      // same shape of bug as useSectionStops' clamp, just for this
      // separate pixel-based check. Force the last section once truly
      // at the bottom of the page, or it can get stuck one section
      // behind forever and never reach Contacto's own pose.
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) next = sectionEls.length - 1;

      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
      }
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return index;
}

const ScrollMascot = () => {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const stops = useSectionStops();
  const activeSection = useActiveSection();

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
  const xNumber = useSpring(useTransform(scrollYProgress, stops, isMobile ? xWaypointsMobile : xWaypoints), springConfig);
  const x = useTransform(xNumber, (v) => `${v}vw`);
  const scale = useSpring(useTransform(scrollYProgress, stops, isMobile ? scaleWaypointsMobile : scaleWaypoints), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, stops, rotateWaypoints), springConfig);
  const y = useSpring(useTransform(scrollYProgress, stops, isMobile ? yWaypointsMobile : yWaypoints), springConfig);

  // Seeks ONCE to the active section's own start time and plays
  // natively through to the next section's time, then holds — see the
  // big comment at the top of this file for why it's not a continuous
  // scroll-scrub. Doubles as the on-load "intro": mount = section 0
  // (Hero) becomes active immediately, so it plays Hero's own 1s→2.8s
  // range right away with no separate code path needed.
  //
  // Direction matters, and only changes ONCE per section boundary
  // crossed (never continuously per scroll pixel — that's what made
  // the very first version of this feel choppy): arriving FORWARD
  // (scrolling down into a section for the first time on this pass)
  // plays that section's own range natively, start to end. Arriving
  // BACKWARD (scrolling back up into a section already passed)
  // doesn't just snap to a frame OR replay the forward clip again —
  // it plays smoothly in REVERSE from wherever the clip currently
  // sits down to this section's resting frame. <video> has no
  // reliable native reverse playback, so that's faked by manually
  // walking currentTime backward the real elapsed time every
  // animation frame until it reaches the target, instead of calling
  // .play(). If another boundary is crossed before that finishes, the
  // cleanup below cancels it and the next run picks up smoothly from
  // wherever it actually got to — no jump, no restart.
  //
  // Speed also adapts to how fast the visitor is actually scrolling:
  // a fast flick across several sections was crossing boundaries
  // faster than the clip could play/reverse at a flat 1x, so it kept
  // visibly lagging behind — reading as stuck/choppy even though
  // nothing was technically broken. rate below measures the real time
  // between this transition and the previous one and speeds both
  // forward playbackRate and the reverse step up to match, capped at
  // 3x so it still reads as the clip playing rather than a blur, and
  // floored at 1x (the clip's own normal pace) for a slow/deliberate
  // scroll — or the very first transition on mount, since
  // lastTransitionRef starts at 0 and any real performance.now() minus
  // that is already a huge gap.
  const prevSectionRef = useRef(0);
  const lastTransitionRef = useRef(0);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const movingForward = activeSection >= prevSectionRef.current;
    prevSectionRef.current = activeSection;

    const now = performance.now();
    const sinceLastTransition = now - lastTransitionRef.current;
    lastTransitionRef.current = now;
    const rate = Math.max(1, Math.min(3, 700 / sinceLastTransition));

    let cancelled = false;
    let stopTimer = null;
    let reverseFrame = null;

    const stopReverse = () => {
      if (reverseFrame !== null) {
        cancelAnimationFrame(reverseFrame);
        reverseFrame = null;
      }
    };

    const reverseTo = (target) => {
      let lastTime = null;
      const step = (now2) => {
        if (cancelled) return;
        if (lastTime === null) lastTime = now2;
        const dt = (now2 - lastTime) / 1000;
        lastTime = now2;
        const next = video.currentTime - dt * rate;
        if (next <= target) {
          video.currentTime = target;
          reverseFrame = null;
          return;
        }
        video.currentTime = next;
        reverseFrame = requestAnimationFrame(step);
      };
      reverseFrame = requestAnimationFrame(step);
    };

    const apply = () => {
      if (cancelled) return;
      const startTime = videoTimeWaypoints[activeSection];
      const endTime = videoTimeWaypoints[activeSection + 1] ?? startTime;

      if (movingForward) {
        if (endTime > startTime) {
          video.currentTime = startTime;
          video.playbackRate = rate;
          // play() returns a promise that rejects if the browser
          // blocks it — harmless here, it just means the clip stays
          // on its first frame instead of playing through.
          video.play().catch(() => {});
          stopTimer = setTimeout(() => {
            if (!cancelled) {
              video.pause();
              video.playbackRate = 1;
            }
          }, ((endTime - startTime) / rate) * 1000);
        } else {
          // Last section, nothing to play forward into.
          video.pause();
          video.currentTime = endTime;
        }
      } else {
        video.pause();
        reverseTo(endTime);
      }
    };

    if (video.readyState >= 1) {
      apply();
    } else {
      video.addEventListener('loadedmetadata', apply, { once: true });
    }

    return () => {
      cancelled = true;
      clearTimeout(stopTimer);
      stopReverse();
      video.removeEventListener('loadedmetadata', apply);
    };
  }, [activeSection]);

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
