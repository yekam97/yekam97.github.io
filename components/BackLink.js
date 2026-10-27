'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { goBack } from '@/lib/returnPoint';

// A link back to the home page that returns to the exact spot the visitor left
// (see lib/returnPoint.js). `href` is the fallback: the matching home section,
// used when the inner page was opened directly.
export default function BackLink({ href, children, ...rest }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        goBack(router, href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
