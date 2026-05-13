'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeatured, getSettings } from '@/lib/api';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import styles from './page.module.css';

/* ─ HERO ─────────────────────────────────────────── */
function Hero({ settings }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const wa = settings?.contact?.whatsapp ?? '6281317935360';

  return (
    <section ref={ref} className={styles.hero}>
      {/* Parallax image */}
      <motion.div className={styles.heroBg} style={{ y }}>
        <Image src="/Foto Produk/IMG_7054.PNG" alt="Savana Taylor" fill priority sizes="100vw"
          className={styles.heroBgImg}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className={styles.heroGradient} />
      </motion.div>

      <motion.div className={`container ${styles.heroContent}`} style={{ opacity }}>
        {/* Eyebrow */}
        <motion.div
          className={styles.heroEyebrow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`label ${styles.heroLabel}`}>Est. 2014 · Jakarta</span>
          <div className={styles.heroLine} />
        </motion.div>

        {/* Title — editorial split */}
        <div className={styles.heroTitle}>
          <motion.span
            className={`display-xl ${styles.heroWord}`}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting
          </motion.span>
          <motion.span
            className={`display-xl ${styles.heroWordItalic}`}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Elegance
          </motion.span>
        </div>

        <motion.div
          className={styles.heroBottom}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        >
          <p className={`body-lg ${styles.heroDesc}`}>
            Spesialis baju dinas kejaksaan, formal wear premium,<br />dan custom tailoring untuk para profesional.
          </p>
          <div className={styles.heroCta}>
            <Link href="/baju-dinas" className="btn btn-outline-white">Explore Collection</Link>
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              Book Appointment
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className={styles.scrollHint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span className={`label ${styles.scrollLabel}`}>Scroll</span>
        <motion.div className={styles.scrollLine} animate={{ scaleY: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
      </motion.div>
    </section>
  );
}

/* ─ MARQUEE ──────────────────────────────────────── */
function Marquee() {
  const items = ['Custom Made', '·', 'Exclusive', '·', 'Elegant', '·', 'Timeless', '·', 'Premium Quality', '·', 'Baju Dinas', '·', 'Formal Wear', '·'];
  return (
    <div className={styles.marqueeWrap}>
      <motion.div
        className={styles.marqueeTrack}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className={`label ${styles.marqueeItem}`}>{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─ EDITORIAL GRID ───────────────────────────────── */
function EditorialGrid() {
  const categories = [
    { href: '/baju-dinas', label: 'Baju Dinas', sub: 'PDU · PDL · PDH', img: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG', span: 'tall' },
    { href: '/men-collection', label: "Men's Collection", sub: 'Jas · Kemeja · Celana', img: '/Foto Produk/IMG_7054.PNG' },
    { href: '/women-collection', label: "Women's Collection", sub: 'Blazer · Kebaya · Dress', img: '/Foto Produk/IMG_7134.PNG' },
    { href: '/custom-tailor', label: 'Custom Tailor', sub: 'Full Custom · Premium', img: '/Foto Produk/IMG_7062.PNG', span: 'wide' },
  ];

  return (
    <section className={`${styles.section} ${styles.sectionCream}`}>
      <div className="container">
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className={`label ${styles.sectionLabel}`}>Our Collections</span>
          <h2 className={`heading-xl ${styles.sectionTitle}`}>Temukan Koleksi Kami</h2>
          <div className="gold-line" />
        </motion.div>

        <div className={styles.editorialGrid}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              className={`${styles.editorialCell} ${cat.span === 'tall' ? styles.cellTall : ''} ${cat.span === 'wide' ? styles.cellWide : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link href={cat.href} className={styles.editorialLink}>
                <div className={styles.editorialImg}>
                  <Image src={cat.img} alt={cat.label} fill sizes="600px" className={styles.editorialPhoto} />
                  <div className={styles.editorialOverlay} />
                </div>
                <div className={styles.editorialInfo}>
                  <span className={`label ${styles.editorialSub}`}>{cat.sub}</span>
                  <h3 className={`heading-md ${styles.editorialLabel}`}>{cat.label}</h3>
                  <span className={styles.editorialArrow}>Explore →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─ BEST SELLERS ─────────────────────────────────── */
function BestSellers() {
  const { data, isLoading } = useQuery({ queryKey: ['featured'], queryFn: getFeatured });
  const products = data?.data ?? [];

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className={`label ${styles.sectionLabel}`}>Best Sellers</span>
          <h2 className={`heading-xl ${styles.sectionTitle}`}>Produk Terpopuler</h2>
          <div className="gold-line" />
        </motion.div>

        <div className={styles.productGrid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>

        <motion.div className={styles.viewAll}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link href="/baju-dinas" className="btn btn-outline">View All Collections</Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─ USP STRIP ────────────────────────────────────── */
function UspStrip() {
  const usps = [
    { title: 'Custom Ukuran', desc: 'Setiap pakaian dibuat sesuai ukuran presisi Anda' },
    { title: 'Bahan Premium', desc: 'Wool, semi-wool, dan bahan tactical premium pilihan' },
    { title: 'By Appointment', desc: 'Pelayanan eksklusif dengan perjanjian terlebih dahulu' },
    { title: '10+ Tahun', desc: 'Pengalaman melayani profesional di seluruh Indonesia' },
  ];
  return (
    <section className={styles.uspStrip}>
      {usps.map((u, i) => (
        <motion.div key={i} className={styles.uspCard}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
          <span className={styles.uspNum}>{String(i + 1).padStart(2, '0')}</span>
          <h4 className={styles.uspTitle}>{u.title}</h4>
          <p className={styles.uspDesc}>{u.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}

/* ─ CTA BANNER ───────────────────────────────────── */
function CtaBanner() {
  return (
    <section className={styles.ctaBanner}>
      <div className={styles.ctaBg}>
        <Image src="/Foto Produk/IMG_7058.PNG" alt="" fill sizes="100vw" className={styles.ctaBgImg} />
        <div className={styles.ctaGradient} />
      </div>
      <div className={`container ${styles.ctaContent}`}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className={`label ${styles.ctaLabel}`}>Exclusive Service</span>
          <h2 className={`display-lg ${styles.ctaTitle}`}>Siap Tampil<br /><em>Lebih Berkelas?</em></h2>
          <p className={`body-lg ${styles.ctaDesc}`}>Konsultasi gratis. Booking via WhatsApp. Pertemuan harus dengan janji.</p>
          <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Chat WhatsApp Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─ PAGE ─────────────────────────────────────────── */
export default function HomePage() {
  const { data: settingsData } = useQuery({ queryKey: ['settings'], queryFn: getSettings });
  return (
    <>
      <Hero settings={settingsData?.data} />
      <Marquee />
      <EditorialGrid />
      <BestSellers />
      <UspStrip />
      <CtaBanner />
    </>
  );
}
