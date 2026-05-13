'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getRentals } from '@/lib/api';
import { STORAGE } from '@/lib/api';
import styles from './rental.module.css';

function resolveImg(src) {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/Foto Produk/') || src.startsWith('/Logo/')) return src;
  return `${STORAGE}${src}`;
}

/* Fallback images from existing product photos if no rental images yet */
const FALLBACK_IMGS = [
  '/Foto Produk/IMG_7054.PNG',
  '/Foto Produk/IMG_7058.PNG',
  '/Foto Produk/IMG_7062.PNG',
  '/Foto Produk/IMG_7065.PNG',
];

function RentalCard({ item, index }) {
  const img = resolveImg(item.images?.[0]) || FALLBACK_IMGS[index % FALLBACK_IMGS.length];

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.cardImg}>
        <Image src={img} alt={item.name} fill sizes="(max-width:768px) 100vw, 500px"
          className={styles.cardPhoto} />
        <div className={styles.cardOverlay} />
        <span className={`label ${styles.cardBadge}`}>{item.status === 'available' ? 'Tersedia' : 'Habis Disewa'}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{item.name}</h3>
        {item.description && <p className={styles.cardDesc}>{item.description}</p>}
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice}>{item.price_display || 'Hubungi Kami'}</span>
          <a
            href={item.whatsapp_url || 'https://wa.me/6281317935360'}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-dark ${styles.cardBtn}`}
          >
            Tanya via WA
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Static fallback rentals if API empty */
const STATIC_RENTALS = [
  {
    id: 1, name: 'Setelan Jas Pria Formal',
    description: 'Setelan jas lengkap pria untuk acara pernikahan, wisuda, dan formal event.',
    price_display: 'Rp 250.000 / hari', status: 'available',
    images: ['/Foto Produk/IMG_7054.PNG'],
    whatsapp_url: 'https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+sewa+Setelan+Jas+Pria+Formal.+Mohon+info+ketersediaan+dan+harga.',
  },
  {
    id: 2, name: 'Jas Wanita Formal',
    description: 'Jas wanita elegan untuk acara formal, wisuda, seminar, dan pernikahan.',
    price_display: 'Rp 200.000 / hari', status: 'available',
    images: ['/Foto Produk/IMG_7134.PNG'],
    whatsapp_url: 'https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+sewa+Jas+Wanita+Formal.+Mohon+info+ketersediaan+dan+harga.',
  },
  {
    id: 3, name: 'Kebaya Modern Wanita',
    description: 'Kebaya modern premium untuk acara adat, pernikahan, dan perayaan nasional.',
    price_display: 'Rp 200.000 / hari', status: 'available',
    images: ['/Foto Produk/IMG_7137.PNG'],
    whatsapp_url: 'https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+sewa+Kebaya+Modern.+Mohon+info+ketersediaan+dan+harga.',
  },
  {
    id: 4, name: 'One Set Formal Premium',
    description: 'Paket lengkap: jas, kemeja, celana/rok untuk tampil sempurna di segala acara formal.',
    price_display: 'Rp 350.000 / hari', status: 'available',
    images: ['/Foto Produk/IMG_7058.PNG'],
    whatsapp_url: 'https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+sewa+One+Set+Formal+Premium.+Mohon+info+ketersediaan+dan+harga.',
  },
];

export default function RentalPage() {
  const { data, isLoading } = useQuery({ queryKey: ['rentals'], queryFn: getRentals });
  const rentals = (data?.data?.length ? data.data : STATIC_RENTALS);

  return (
    <div className={styles.page}>
      {/* ─ HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/Foto Produk/IMG_7058.PNG" alt="" fill sizes="100vw" className={styles.heroBgImg} priority />
          <div className={styles.heroGrad} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className={`label ${styles.heroLabel}`}>Service · Rental</span>
            <h1 className={`display-lg ${styles.heroTitle}`}>
              Tampil Elegan<br /><em>Tanpa Beli</em>
            </h1>
            <div className={styles.heroDivider} />
            <p className={`body-lg ${styles.heroDesc}`}>
              Sewa pakaian formal premium Savana Taylor untuk acara spesial Anda.<br />
              Pilih, fitting, dan tampil percaya diri.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─ HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className="container">
          <motion.div className={styles.howHeader}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className={`label ${styles.sectionLabel}`}>Cara Penyewaan</span>
            <h2 className={`heading-xl ${styles.sectionTitle}`}>Mudah & Eksklusif</h2>
            <div className="gold-line gold-line-center" />
          </motion.div>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'Hubungi Kami', desc: 'Chat via WhatsApp untuk cek ketersediaan dan pilih item yang sesuai.' },
              { n: '02', title: 'Book & Fitting', desc: 'Datang ke boutique (by appointment) untuk fitting dan penyesuaian ukuran.' },
              { n: '03', title: 'Tampil Percaya Diri', desc: 'Kenakan pakaian premium Savana Taylor dan tampil memukau di acara Anda.' },
              { n: '04', title: 'Pengembalian', desc: 'Kembalikan pakaian sesuai tanggal yang disepakati dalam kondisi baik.' },
            ].map((s, i) => (
              <motion.div key={i} className={styles.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <span className={styles.stepNum}>{s.n}</span>
                <h4 className={styles.stepTitle}>{s.title}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─ CATALOG */}
      <section className={styles.catalogSection}>
        <div className="container">
          <motion.div className={styles.catalogHeader}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className={`label ${styles.sectionLabel}`}>Pilihan Rental</span>
            <h2 className={`heading-xl ${styles.sectionTitle}`}>Koleksi Rental</h2>
            <div className="gold-line gold-line-center" />
          </motion.div>
          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.card}>
                  <div className={`skeleton ${styles.cardImg}`} />
                  <div className={styles.cardBody}>
                    <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 12 }} />
                    <div className="skeleton" style={{ height: 14, width: '90%', marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {rentals.map((item, i) => <RentalCard key={item.id} item={item} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ─ NOTE / CTA */}
      <section className={styles.noteSection}>
        <div className="container">
          <motion.div className={styles.noteCard}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.noteContent}>
              <span className={`label ${styles.sectionLabel}`}>Catatan Penting</span>
              <h3 className={`heading-md ${styles.noteTitle}`}>Syarat & Ketentuan Rental</h3>
              <ul className={styles.noteList}>
                <li>Penyewaan hanya dengan perjanjian terlebih dahulu (by appointment only)</li>
                <li>Tersedia deposit keamanan yang akan dikembalikan setelah pakaian kembali dalam kondisi baik</li>
                <li>Harga belum termasuk ongkos pengiriman untuk di luar Jakarta</li>
                <li>Keterlambatan pengembalian dikenakan biaya tambahan per hari</li>
                <li>Kerusakan atau kehilangan ditanggung penyewa</li>
              </ul>
            </div>
            <div className={styles.noteCta}>
              <p className={styles.noteCtaText}>Ada pertanyaan? Hubungi kami langsung.</p>
              <a href="https://wa.me/6281317935360?text=Halo+Savana+Taylor,+saya+ingin+tanya+tentang+rental+pakaian." target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
