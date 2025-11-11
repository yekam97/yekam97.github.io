import Link from 'next/link';
import styles from './ServiciosNav.module.css';

export default function ServiciosNav() {
  return (
    <nav className={styles.navbar} aria-label="Navegación principal">
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo} title="Volver a inicio">
          <span className={styles.logoIcon}>←</span>
          <span className={styles.logoText}>Inicio</span>
        </Link>
      </div>
    </nav>
  );
}
