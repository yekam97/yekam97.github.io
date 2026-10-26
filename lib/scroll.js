// Smooth-scrolls to a section by id, leaving room for the floating nav.
// Shared by the nav links and every "next section" button.
export const scrollToId = (id, offset = 90) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
