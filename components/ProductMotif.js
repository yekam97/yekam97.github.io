import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ProductMotif.module.css';

/**
 * Recurring editorial "figure plate" — a single-line contour drawing that
 * stands in for real product/still-life photography (renders, ceramics,
 * objects). This is a clearly-labelled PLACEHOLDER: swap the <svg> for an
 * actual photograph or render when available, using the same band/caption
 * treatment so the motif keeps recurring across the page.
 */
const ProductMotif = ({ figureNumber = '01' }) => {
  const { language } = useLanguage();

  return (
    <div className={styles.band}>
      <div className={styles.rule} />
      <motion.div
        className={styles.figureWrap}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Placeholder line-art of a table lamp — replace with a real
            product photograph / render, same aspect treatment. */}
        <svg viewBox="0 0 200 160" className={styles.figure} aria-hidden="true">
          <path d="M100 18 C 78 18 62 34 62 54 C 62 70 74 82 90 86 L 78 118 L 122 118 L 110 86 C 126 82 138 70 138 54 C 138 34 122 18 100 18 Z" />
          <line x1="100" y1="118" x2="100" y2="132" />
          <line x1="70" y1="132" x2="130" y2="132" />
          <ellipse cx="100" cy="140" rx="42" ry="6" />
        </svg>
      </motion.div>
      <span className={styles.caption}>
        {language === 'es'
          ? `Fig. ${figureNumber} — Still life de producto (placeholder fotográfico)`
          : `Fig. ${figureNumber} — Product still life (photography placeholder)`}
      </span>
      <div className={styles.rule} />
    </div>
  );
};

export default ProductMotif;
