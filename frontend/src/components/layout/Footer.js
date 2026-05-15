import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <Image src="/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png" alt="Savana Tailor" width={48} height={48} className={styles.logoImg} />
            <span className={styles.logoText}>SAVANA <span className={styles.dot}>·</span> TAILOR</span>
          </div>
          <p className={styles.tagline}>Custom Made &bull; Exclusive &bull; Elegant &bull; Timeless</p>
          <div className={styles.socials}>
            <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className={styles.social}>WhatsApp</a>
            <a href="https://instagram.com/savanatailorboutique" target="_blank" rel="noopener noreferrer" className={styles.social}>Instagram</a>
            <a href="https://tiktok.com/@savanatailorboutique" target="_blank" rel="noopener noreferrer" className={styles.social}>TikTok</a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Collection</h4>
          <nav className={styles.colLinks}>
            <Link href="/baju-dinas">Baju Dinas</Link>
            <Link href="/men-collection">Men&rsquo;s Collection</Link>
            <Link href="/women-collection">Women&rsquo;s Collection</Link>
            <Link href="/custom-tailor">Custom Tailor</Link>
            <Link href="/rental">Rental</Link>
          </nav>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <nav className={styles.colLinks}>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer">Book Appointment</a>
          </nav>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <p className={styles.contactLine}>
            <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer">081 317 935 360</a>
          </p>
          <p className={styles.contactLine}>Jakarta Utara, Indonesia</p>
          <p className={styles.contactLine}>By Appointment Only</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copyright}>&copy; {year} Savana Tailor Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
