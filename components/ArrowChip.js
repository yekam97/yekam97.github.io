// Round arrow badge that sits at the end of a button. On hover the button
// turns it into a "↗" (see .btn-chip in style.css). Decorative only.
export default function ArrowChip() {
  return (
    <span className="btn-chip" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8 H12.5 M8.5 4 L12.5 8 L8.5 12" />
      </svg>
    </span>
  );
}
