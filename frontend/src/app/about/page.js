'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

const ACHIEVEMENTS = [
  { num: '10+', label: 'Tahun Pengalaman' },
  { num: '30+', label: 'Kota Dilayani' },
  { num: '1000+', label: 'Klien Profesional' },
  { num: '100%', label: 'Custom Made' },
];

const REGIONS = [
  'Aceh', 'Bangka Belitung', 'Sumatera Utara', 'Riau', 'Palembang',
  'Jakarta', 'Bogor', 'Depok', 'Bandung', 'Jawa Tengah', 'Jawa Timur',
  'Kalimantan', 'Sulawesi', 'Bali', 'Nusa Tenggara', 'Maluku', 'Papua',
];

const VALUES = [
  {
    title: 'Personalized',
    desc: 'Setiap pakaian dibuat khusus untuk Anda — ukuran presisi, desain sesuai kebutuhan, finishing detail.',
    img: '/Foto Produk/IMG_7062.PNG',
  },
  {
    title: 'Premium Quality',
    desc: 'Menggunakan bahan tactical premium, wool & semi wool, dan material pilihan yang nyaman serta tahan lama.',
    img: '/Foto Produk/IMG_7054.PNG',
  },
  {
    title: 'Professional',
    desc: 'Melayani instansi pemerintah, kejaksaan, TNI/Polri, dan profesional korporat di seluruh Indonesia.',
    img: '/Foto Produk/IMG_7134.PNG',
  },
];

const TABS = ['Identitas', 'Visi & Misi', 'Keunggulan', 'Wilayah'];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.page}>

      {/* ─ HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Left — text */}
          <div className={styles.heroLeft}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <span className={`label ${styles.heroLabel}`}>Est. 2014 · Jakarta</span>
              <h1 className={`display-lg ${styles.heroTitle}`}>
                The Art of<br /><em>Bespoke Tailoring</em>
              </h1>
              <div className={styles.heroDivider} />
              <p className={`body-lg ${styles.heroDesc}`}>
                Savana Taylor Boutique adalah premium tailor boutique yang bergerak di bidang
                custom formal wear dan professional uniform untuk pria dan wanita.
              </p>
              <div className={styles.heroActions}>
                <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  Book Appointment
                </a>
                <Link href="/baju-dinas" className="btn btn-outline">
                  Lihat Koleksi
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — editorial image stack */}
          <div className={styles.heroRight}>
            <motion.div className={styles.imgStack}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <div className={styles.imgMain}>
                <Image src="/Foto Produk/Man paling atas PDUK PIMPINAN.PNG" alt="Savana Taylor" fill sizes="600px" className={styles.imgPhoto} />
              </div>
              <div className={styles.imgSecond}>
                <Image src="/Foto Produk/PDUK Jaksa Perempuan.PNG" alt="Savana Taylor" fill sizes="300px" className={styles.imgPhoto} />
              </div>
              <div className={styles.imgLabel}>
                <span className={`label ${styles.imgLabelText}`}>Premium Tailoring</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─ STATS */}
      <section className={styles.statsStrip}>
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div key={i} className={styles.statItem}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
            <span className={`display-lg ${styles.statNum}`}>{a.num}</span>
            <span className={`label ${styles.statLabel}`}>{a.label}</span>
          </motion.div>
        ))}
      </section>

      {/* ─ BRAND STORY — Tab section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyLayout}>
            {/* Sidebar tabs */}
            <aside className={styles.storyTabs}>
              {TABS.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`${styles.tabBtn} ${activeTab === i ? styles.tabBtnActive : ''}`}>
                  <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.tabLabel}>{t}</span>
                </button>
              ))}
            </aside>

            {/* Content */}
            <div className={styles.storyContent}>
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div key="id" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <span className={`label ${styles.contentLabel}`}>Tentang Kami</span>
                    <h2 className={`heading-lg ${styles.contentTitle}`}>Siapa Savana Taylor?</h2>
                    <div className="gold-line" style={{ margin: '24px 0' }} />
                    <p className={styles.contentBody}>
                      Savana Taylor Boutique adalah <strong>premium tailor boutique</strong> yang bergerak di bidang
                      custom formal wear dan professional uniform untuk pria dan wanita. Selama kurang lebih
                      <strong> 10 tahun</strong>, kami telah melayani berbagai kebutuhan pakaian formal dengan
                      konsep eksklusif, elegan, dan profesional.
                    </p>
                    <p className={styles.contentBody}>
                      Berdiri sejak 2014, kami hadir untuk menjawab kebutuhan profesional Indonesia yang menginginkan
                      pakaian formal berkualitas tinggi dengan ukuran dan desain yang benar-benar personal.
                      Dari baju dinas kejaksaan hingga jas pesta premium — semua kami kerjakan dengan standar boutique.
                    </p>
                    <div className={styles.highlight}>
                      <span className={`label ${styles.highlightLabel}`}>Brand Tagline</span>
                      <p className={styles.highlightText}>
                        &ldquo;Exclusive tailor experience for professionals who value quality, precision, and identity.&rdquo;
                      </p>
                    </div>
                  </motion.div>
                )}
                {activeTab === 1 && (
                  <motion.div key="visi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <span className={`label ${styles.contentLabel}`}>Visi & Misi</span>
                    <h2 className={`heading-lg ${styles.contentTitle}`}>Arah & Tujuan Kami</h2>
                    <div className="gold-line" style={{ margin: '24px 0' }} />
                    <div className={styles.visiMisi}>
                      <div className={styles.visiBlock}>
                        <h3 className={styles.subTitle}>Visi</h3>
                        <p className={styles.contentBody}>
                          Menjadi boutique tailor profesional terpercaya di Indonesia dalam bidang
                          formal wear premium dan custom uniform yang mengutamakan kualitas,
                          presisi, dan identitas profesional klien.
                        </p>
                      </div>
                      <div className={styles.misiBlock}>
                        <h3 className={styles.subTitle}>Misi</h3>
                        <ul className={styles.misiList}>
                          {[
                            'Menghadirkan produk pakaian formal berkualitas tinggi dengan bahan-bahan premium pilihan',
                            'Memberikan pelayanan yang profesional, personal, dan memuaskan bagi setiap klien',
                            'Menjaga detail dan kualitas pengerjaan di setiap produk yang kami hasilkan',
                            'Membantu klien tampil lebih percaya diri, elegan, dan berwibawa',
                            'Memberikan solusi pakaian formal yang terukur dan sesuai kebutuhan instansi maupun personal',
                          ].map((m, i) => (
                            <li key={i} className={styles.misiItem}>
                              <span className={styles.misiDot} />
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === 2 && (
                  <motion.div key="keunggulan" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <span className={`label ${styles.contentLabel}`}>Kenapa Kami</span>
                    <h2 className={`heading-lg ${styles.contentTitle}`}>Keunggulan Kami</h2>
                    <div className="gold-line" style={{ margin: '24px 0' }} />
                    {[
                      { title: 'Personalized Custom Tailoring', points: ['Mengukur langsung di boutique (by appointment)', 'Penyesuaian ukuran sampai benar-benar pas', 'Desain sesuai kebutuhan & preferensi klien', 'Fitting dan revisi sampai sempurna'] },
                      { title: 'Premium Quality Materials', points: ['Wool & semi wool pilihan', 'Bahan tactical premium untuk dinas', 'Material breathable untuk kenyamanan maksimal', 'Detail finishing tangan yang rapi & tahan lama'] },
                      { title: 'Professional Service', points: ['By appointment only — privat dan eksklusif', 'Konsultasi desain langsung dengan tim ahli', 'Pengiriman ke seluruh Indonesia', 'Garansi kerapian jahitan dan ukuran'] },
                    ].map((k, i) => (
                      <div key={i} className={styles.keunggulan}>
                        <h3 className={styles.keunggulanTitle}>{k.title}</h3>
                        <ul className={styles.misiList}>
                          {k.points.map((p, j) => <li key={j} className={styles.misiItem}><span className={styles.misiDot} />{p}</li>)}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
                {activeTab === 3 && (
                  <motion.div key="wilayah" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                    <span className={`label ${styles.contentLabel}`}>Jangkauan Layanan</span>
                    <h2 className={`heading-lg ${styles.contentTitle}`}>Wilayah yang Dilayani</h2>
                    <div className="gold-line" style={{ margin: '24px 0' }} />
                    <p className={styles.contentBody}>
                      Meskipun boutique kami berlokasi di Jakarta Utara, kami melayani pemesanan dan pengiriman
                      ke seluruh Indonesia. Klien dari luar kota dapat melakukan konsultasi via WhatsApp
                      dan pengukuran via panduan digital yang kami sediakan.
                    </p>
                    <div className={styles.regionGrid}>
                      {REGIONS.map((r, i) => (
                        <motion.span key={i} className={styles.regionTag}
                          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}>
                          {r}
                        </motion.span>
                      ))}
                    </div>
                    <div className={styles.highlight}>
                      <span className={`label ${styles.highlightLabel}`}>Lokasi Boutique</span>
                      <p className={styles.highlightText}>Jakarta Utara, Indonesia — By Appointment Only</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─ VALUES GRID (editorial photos) */}
      <section className={styles.valuesSection}>
        <div className="container">
          <motion.div className={styles.valuesHeader}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className={`label ${styles.sectionLabel}`}>Nilai Kami</span>
            <h2 className={`heading-xl ${styles.valuesTitle}`}>Apa yang Membuat Kami Berbeda</h2>
            <div className="gold-line gold-line-center" />
          </motion.div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <motion.div key={i} className={styles.valueCard}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }}>
                <div className={styles.valueImg}>
                  <Image src={v.img} alt={v.title} fill sizes="500px" className={styles.valuePhoto} />
                  <div className={styles.valueOverlay} />
                </div>
                <div className={styles.valueInfo}>
                  <h3 className={`heading-md ${styles.valueName}`}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div className={styles.ctaInner}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className={`label ${styles.sectionLabel}`}>Mari Berkolaborasi</span>
            <h2 className={`heading-xl ${styles.ctaTitle}`}>Siap Tampil Berkelas?</h2>
            <p className={styles.ctaDesc}>
              Konsultasi gratis. Book appointment sekarang via WhatsApp.<br />
              Pertemuan harus dengan janji terlebih dahulu.
            </p>
            <div className={styles.ctaActions}>
              <a href="https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+book+appointment." target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Book Appointment
              </a>
              <Link href="/contact" className="btn btn-outline">
                Lihat Kontak
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
