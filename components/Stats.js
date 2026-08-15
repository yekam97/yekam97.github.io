'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Stats.module.css';

// Counts up from 0 to `target` once the number scrolls into view, easing
// out toward the end. Runs on a plain rAF loop (not a spring) so the value
// lands exactly on the target instead of overshooting/settling visually.
const CountUp = ({ target, suffix = '', locale, duration = 1.4 }) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    setStarted(true);
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const display = locale ? value.toLocaleString(locale) : value;

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, amount: 0.6 }}>
      {display}{suffix}
    </motion.span>
  );
};

const getStats = (language) => {
  const isEn = language === 'en';
  return [
    { target: 3, suffix: '+', locale: null, label: isEn ? 'Years of professional experience' : 'Años de experiencia profesional' },
    { target: 4, suffix: '', locale: null, label: isEn ? 'Specialization areas' : 'Áreas de especialización' },
    { target: 9, suffix: '', locale: null, label: isEn ? 'Degrees & certifications' : 'Títulos y certificaciones' }
  ];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Stats = () => {
  const { language } = useLanguage();
  const stats = getStats(language);

  return (
    <div className="container">
      <motion.div
        className={styles.statsBar}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} className={styles.statItem} variants={itemVariants}>
            <span className={styles.statNumber}>
              <CountUp target={stat.target} suffix={stat.suffix} locale={stat.locale} />
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Stats;
