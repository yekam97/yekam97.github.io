'use client';

import { useSyncExternalStore } from 'react';

// Tiny shared store for the intro "preloader": the Preloader component
// flips it to done when its curtain starts lifting, and anything that
// should wait for the intro (the hero entrance) subscribes to it.
//
// Fail-safe by design: whenever the intro isn't going to play at all
// (reduced motion, phones/touch, server render) the store starts out
// "done", so nothing ever waits on an animation that never runs.

let done = null; // null = not decided yet (decided lazily, client-side)
const listeners = new Set();

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Same call the reference site makes: skip the intro on touch / small
  // screens, where a 2s curtain just feels like a slow page.
  const small = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
  return !reduced && !small;
};

export const isPreloaderDone = () => {
  if (done === null) done = !shouldPlay();
  return done;
};

export const finishPreloader = () => {
  if (done === true) return;
  done = true;
  listeners.forEach((l) => l());
};

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const usePreloaderDone = () =>
  useSyncExternalStore(subscribe, isPreloaderDone, () => true);
