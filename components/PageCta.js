'use client';

import { useRouter } from 'next/router';
import MagneticButton from './MagneticButton';
import ArrowChip from './ArrowChip';

// Same look as SectionCta, but navigates to ANOTHER PAGE (an inner subpage).
// Renders a real <a href> (works in new tabs, for crawlers and assistive tech)
// and does a client-side navigation on a normal click.
export default function PageCta({ href, children, variant = 'primary', className = '', ...rest }) {
  const router = useRouter();
  const cls = variant === 'outline' ? 'btn-outline' : 'btn-neon';
  return (
    <MagneticButton
      href={href}
      className={`${cls} ${className}`}
      strength={0.28}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        router.push(href);
      }}
      {...rest}
    >
      {children}
      {variant === 'primary' && <ArrowChip />}
    </MagneticButton>
  );
}
