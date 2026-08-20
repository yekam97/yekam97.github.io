import { useLanguage } from '@/context/LanguageContext';
import styles from './CategoryMarquee.module.css';

// Purely decorative, infinite-loop restatement of the same four
// disciplines already named in Portfolio/Skills — marked aria-hidden so
// screen readers aren't handed the same list twice.
const CategoryMarquee = () => {
  const { language } = useLanguage();
  const items = language === 'es'
    ? ['Diseño Industrial', 'UX/UI', 'Branding', 'Mentorías']
    : ['Industrial Design', 'UX/UI', 'Branding', 'Mentoring'];

  const track = (
    <span className={styles.track}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {item}
          <span className={styles.symbol}>✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeInner}>
        {track}
        {track}
      </div>
    </div>
  );
};

export default CategoryMarquee;
