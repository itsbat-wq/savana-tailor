'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import styles from './Navbar.module.css';

const SHOP_ITEMS = [
  { href: '/baju-dinas', label: 'Baju Dinas' },
  { href: '/men-collection', label: "Men's Collection" },
  { href: '/women-collection', label: "Women's Collection" },
  { href: '/custom-tailor', label: 'Custom Tailor' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setShopOpen(false); }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header className={`${styles.nav} ${transparent ? styles.navTransparent : styles.navSolid}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image src="/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png" alt="Savana Tailor" width={40} height={40} className={styles.logoImg} />
            <div className={styles.logoTextWrap}>
              <span className={styles.logoText}>SAVANA</span>
              <span className={styles.logoDot} />
              <span className={styles.logoSub}>TAILOR</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.links}>
            <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.linkActive : ''}`}>Home</Link>
            <div
              className={styles.dropdownWrap}
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className={`${styles.link} ${styles.dropdownTrigger} ${SHOP_ITEMS.some(i => pathname === i.href) ? styles.linkActive : ''}`}>
                Collection <ChevronDown size={12} style={{ transition: 'transform 0.3s', transform: shopOpen ? 'rotate(180deg)' : 'none' }} />
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {SHOP_ITEMS.map(item => (
                      <Link key={item.href} href={item.href} className={styles.dropdownItem}>
                        <span>{item.label}</span>
                        <span className={styles.dropdownArrow}>→</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/rental" className={`${styles.link} ${pathname === '/rental' ? styles.linkActive : ''}`}>Rental</Link>
            <Link href="/about" className={`${styles.link} ${pathname === '/about' ? styles.linkActive : ''}`}>About</Link>
            <Link href="/contact" className={`${styles.link} ${pathname === '/contact' ? styles.linkActive : ''}`}>Contact</Link>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className={styles.actions}>
            <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className={`btn ${transparent ? 'btn-outline-white' : 'btn-dark'} ${styles.ctaBtn}`}>
              Book Appointment
            </a>
            <button className={styles.mobileToggle} onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className={styles.mobileOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside
              className={styles.mobileSidebar}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className={styles.mobileClose} onClick={() => setMobileOpen(false)}><X size={22} /></button>
              <div className={styles.mobileLogoWrap}>
                <Image src="/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png" alt="Savana Tailor" width={48} height={48} style={{ marginBottom: 12, borderRadius: '50%' }} />
                <span className={styles.mobileLogoText}>SAVANA TAILOR</span>
              </div>
              <nav className={styles.mobileNav}>
                {[{ href: '/', label: 'Home' }, ...SHOP_ITEMS, { href: '/rental', label: 'Rental' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }].map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link href={item.href} className={styles.mobileLink}>{item.label}</Link>
                  </motion.div>
                ))}
              </nav>
              <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${styles.mobileCta}`}>
                Book via WhatsApp
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
