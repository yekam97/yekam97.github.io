'use client';

import { createContext, useContext, useState } from 'react';

// Shares which project-category color is "live" right now (set by the
// Portfolio carousel) with the global background wash (LivingBackground)
// that reads it. Kept as a tiny, separate context — unrelated to
// LanguageContext — so a color change never re-renders anything that
// only cares about language, and vice versa.
const PageAccentContext = createContext(null);

export function PageAccentProvider({ children }) {
  const [accent, setAccent] = useState('industrial');

  return (
    <PageAccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </PageAccentContext.Provider>
  );
}

export function usePageAccent() {
  const ctx = useContext(PageAccentContext);
  if (!ctx) {
    throw new Error('usePageAccent must be used within PageAccentProvider');
  }
  return ctx;
}
