'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './contact.module.css';

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: '081 317 935 360',
    sub: 'Senin – Sabtu, 09.00 – 18.00 WIB',
    href: 'https://wa.me/6281317935360',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Instagram',
    value: '@savanatailorboutique',
    sub: 'Follow for updates & lookbook',
    href: 'https://instagram.com/savanatailorboutique',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Lokasi',
    value: 'Jakarta Utara, Indonesia',
    sub: 'By Appointment Only',
    href: 'https://maps.google.com/?q=Jakarta+Utara',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      </svg>
    ),
    label: 'TikTok',
    value: '@savanatailorboutique',
    sub: 'Behind the scenes & proses jahit',
    href: 'https://tiktok.com/@savanatailorboutique',
  },
];

const PROCESS = [
  { num: '01', title: 'Hubungi Kami', desc: 'Chat via WhatsApp atau DM Instagram untuk memulai diskusi kebutuhan pakaian Anda.' },
  { num: '02', title: 'Konsultasi & Desain', desc: 'Kami akan mendiskusikan jenis pakaian, bahan, desain, dan memandu pengukuran.' },
  { num: '03', title: 'Produksi Eksklusif', desc: 'Setiap pakaian dikerjakan oleh penjahit berpengalaman dengan standar boutique premium.' },
  { num: '04', title: 'Pengiriman / Fitting', desc: 'Pakaian dikirim ke seluruh Indonesia atau fitting langsung di Jakarta Utara.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>

      {/* ─── HERO ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/Foto Produk/Man paling atas PDUK PIMPINAN.PNG"
            alt="Savana Tailor"
            fill
            sizes="100vw"
            className={styles.heroBgImg}
            priority
          />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={`label ${styles.heroLabel}`}>Hubungi Kami</span>
            <h1 className={`display-lg ${styles.heroTitle}`}>
              Let&rsquo;s Start<br /><em>Your Journey</em>
            </h1>
            <div className={styles.heroDivider} />
            <p className={`body-lg ${styles.heroDesc}`}>
              Konsultasi gratis. Kami siap membantu Anda tampil<br className={styles.desktopBreak} />
              profesional, elegan, dan percaya diri.
            </p>
          </motion.div>
        </div>
        {/* Scroll cue */}
        <div className={styles.scrollCue}>
          <div className={styles.scrollLine} />
          <span className={`label ${styles.scrollLabel}`}>Scroll</span>
        </div>
      </section>

      {/* ─── CONTACT CARDS ──────────────────────── */}
      <section className={styles.cardsSection}>
        <div className="container">
          <div className={styles.cardsGrid}>
            {CONTACT_ITEMS.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.cardIcon}>{c.icon}</div>
                <span className={`label ${styles.cardLabel}`}>{c.label}</span>
                <p className={styles.cardValue}>{c.value}</p>
                <p className={styles.cardSub}>{c.sub}</p>
                <div className={styles.cardArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPLIT: MAP + CTA ───────────────────── */}
      <section className={styles.splitSection}>
        <div className={styles.splitGrid}>
          {/* Left: editorial image */}
          <motion.div className={styles.splitImg} {...fadeUp}>
            <Image
              src="/Foto Produk/PDUK Jaksa Perempuan.PNG"
              alt="Savana Tailor Studio"
              fill
              sizes="50vw"
              className={styles.splitPhoto}
            />
            <div className={styles.splitBadge}>
              <span className={`label ${styles.splitBadgeLabel}`}>Boutique Studio</span>
              <p className={styles.splitBadgeText}>Jakarta Utara</p>
            </div>
          </motion.div>

          {/* Right: contact CTA */}
          <motion.div className={styles.splitContent} {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
            <span className={`label ${styles.sectionLabel}`}>Book Appointment</span>
            <h2 className={`heading-xl ${styles.splitTitle}`}>
              Mulai Konsultasi<br />Sekarang
            </h2>
            <div className="gold-line" style={{ margin: '24px 0' }} />
            <p className={styles.splitDesc}>
              Boutique kami beroperasi <strong>by appointment only</strong> untuk memastikan setiap klien
              mendapat perhatian penuh dari tim kami. Hubungi kami terlebih dahulu untuk menjadwalkan
              kunjungan atau memulai proses pemesanan dari kota Anda.
            </p>

            <div className={styles.infoBlock}>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Jam Operasional</span>
                <span className={styles.infoVal}>Senin – Sabtu, 09.00 – 18.00 WIB</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Lokasi</span>
                <span className={styles.infoVal}>Jakarta Utara, Indonesia</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Pengiriman</span>
                <span className={styles.infoVal}>Ke seluruh Indonesia 🇮🇩</span>
              </div>
            </div>

            <div className={styles.splitActions}>
              <a
                href="https://wa.me/6281317935360?text=Halo+Savana+Tailor,+saya+ingin+melakukan+konsultasi+dan+book+appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Chat WhatsApp
              </a>
              <a
                href="https://instagram.com/savanatailorboutique"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Instagram DM
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────── */}
      <section className={styles.processSection}>
        <div className="container">
          <motion.div className={styles.processHeader} {...fadeUp}>
            <span className={`label ${styles.sectionLabel}`}>Cara Kerja</span>
            <h2 className={`heading-xl ${styles.processTitle}`}>Proses Pemesanan</h2>
            <div className="gold-line gold-line-center" />
          </motion.div>

          <div className={styles.processGrid}>
            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                className={styles.processCard}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.processNum}>{p.num}</span>
                <div className={styles.processLine} />
                <h3 className={`heading-sm ${styles.processCardTitle}`}>{p.title}</h3>
                <p className={styles.processCardDesc}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div className={styles.ctaInner} {...fadeUp}>
            <span className={`label ${styles.ctaLabel}`}>Siap Memulai?</span>
            <h2 className={`heading-xl ${styles.ctaTitle}`}>
              Crafting Elegance,<br />
              <em>Defining Excellence</em>
            </h2>
            <p className={styles.ctaDesc}>
              Savana Tailor Boutique — Custom Made · Exclusive · Elegant · Timeless
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://wa.me/6281317935360?text=Halo+Savana+Tailor,+saya+ingin+book+appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Book Appointment
              </a>
              <Link href="/baju-dinas" className="btn btn-outline-light">
                Lihat Koleksi
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
