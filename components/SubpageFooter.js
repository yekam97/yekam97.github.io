'use client';

import { useRouter } from 'next/router';
import { useLanguage } from '@/context/LanguageContext';
import { goBack } from '@/lib/returnPoint';
import PageCta from './PageCta';
import styles from './Subpage.module.css';

// Closing row of every inner page: back to the home section + talk to me.
export default function SubpageFooter({ backHref, backLabel }) {
  const router = useRouter();
  const { language } = useLanguage();
  const isEs = language === 'es';
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>{isEs ? '¿Hablamos de tu proyecto?' : 'Shall we talk about your project?'}</p>
      <div className={styles.footerCtas}>
        <PageCta href="/#contacto">{isEs ? 'Contactar' : 'Get in touch'}</PageCta>
        <PageCta
          href={backHref}
          variant="outline"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            goBack(router, backHref);
          }}
        >
          {backLabel}
        </PageCta>
      </div>
    </div>
  );
}
