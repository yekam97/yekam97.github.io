// "Back to where you were": when the visitor leaves the home page through a
// link to an inner page (trayectoria, estudios, proyectos/…), the scroll
// position is remembered for the tab. Every "back" control on the inner pages
// (and the browser's own back button) then lands on that same spot of the home
// page instead of at the top of the section.

const KEY = 'yg-return'; // { y } scroll position the visitor left the home page at
const FLAG = 'yg-from-sub'; // set while an inner page is open
const SUB_PATH = /^\/(trayectoria|estudios|proyectos)(\/|$)/;

const store = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null; // private mode / blocked storage: everything below just does nothing
  }
};

// Home page: remember the position whenever a link to an inner page is used.
export const trackReturnPoint = () => {
  const onClick = (e) => {
    const a = e.target?.closest?.('a[href]');
    if (!a) return;
    let url;
    try {
      url = new URL(a.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin || !SUB_PATH.test(url.pathname)) return;
    store()?.setItem(KEY, JSON.stringify({ y: Math.round(window.scrollY) }));
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
};

// Inner page: note that home is the next stop "coming back".
export const markInnerPage = () => store()?.setItem(FLAG, '1');

export const readReturnPoint = () => {
  try {
    const y = JSON.parse(store()?.getItem(KEY) || 'null')?.y;
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
};

// Used by every "back" control: to the remembered spot if there is one,
// otherwise (landed directly on the inner page) to the matching home section.
export const goBack = (router, fallbackHref) => {
  router.push(readReturnPoint() === null ? fallbackHref : '/');
};

export const sectionFor = (pathname) => {
  if (pathname.startsWith('/proyectos')) return '/#portfolio';
  if (pathname.startsWith('/estudios')) return '/#roles';
  if (pathname.startsWith('/trayectoria')) return '/#experiencia';
  return '/';
};

// Home page, after the intro: if we arrive from an inner page, scroll back to
// the remembered position. Sections mount lazily, so wait (up to ~3s) until the
// page is tall enough before jumping, and re-apply once for late layout shifts.
export const restoreReturnPoint = () => {
  const s = store();
  if (!s || s.getItem(FLAG) !== '1') return undefined;
  s.removeItem(FLAG);
  const y = readReturnPoint();
  s.removeItem(KEY);
  if (y === null) return undefined;

  let tries = 0;
  let settle = 0;
  const jump = () => window.scrollTo({ top: y, behavior: 'instant' });
  const timer = setInterval(() => {
    tries += 1;
    const tall = document.documentElement.scrollHeight >= y + window.innerHeight - 40;
    if (tall || tries > 30) {
      clearInterval(timer);
      jump();
      settle = setTimeout(jump, 350);
    }
  }, 100);
  return () => {
    clearInterval(timer);
    clearTimeout(settle);
  };
};

// An explicit #section target wins over the remembered position.
export const clearReturnPoint = () => {
  const s = store();
  s?.removeItem(FLAG);
  s?.removeItem(KEY);
};
