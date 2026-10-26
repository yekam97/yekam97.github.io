'use client';

import MagneticButton from './MagneticButton';
import ArrowChip from './ArrowChip';
import { scrollToId } from '@/lib/scroll';

// "Next step" button used at the end of each section: short copy above it,
// one clear action that takes the visitor to another section. Renders a real
// anchor (so it works in new tabs / assistive tech) but scrolls smoothly.
export default function SectionCta({ to, children, variant = 'primary', className = '', ...rest }) {
  const cls = variant === 'outline' ? 'btn-outline' : 'btn-neon';
  return (
    <MagneticButton
      href={`#${to}`}
      className={`${cls} ${className}`}
      strength={0.28}
      onClick={(e) => {
        e.preventDefault();
        scrollToId(to);
      }}
      {...rest}
    >
      {children}
      {variant === 'primary' && <ArrowChip />}
    </MagneticButton>
  );
}
