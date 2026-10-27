import BackLink from './BackLink';
import { motion } from 'framer-motion';
import Squiggle from './Squiggle';
import styles from './Subpage.module.css';

// Top of every inner page: a way back to the matching home section, a label,
// the title (last word underlined with the hand-drawn squiggle), a one-line
// lead and, optionally, a big illustrated stage on the right.
export default function SubpageHeader({ backHref, backLabel, label, titleStart, titleEnd, lead, stage }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerText}>
        <BackLink href={backHref} className={styles.back}>
          <span aria-hidden="true">←</span> {backLabel}
        </BackLink>
        <motion.span
          className="label-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {label}
        </motion.span>
        <h1 className={styles.title}>
          {titleStart}{' '}
          <span className="squiggle-host">
            {titleEnd}
            <Squiggle />
          </span>
        </h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
      {stage && <div className={styles.headerStage}>{stage}</div>}
    </header>
  );
}
