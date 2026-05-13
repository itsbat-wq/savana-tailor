'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/lib/api';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import { STORAGE } from '@/lib/api';
import styles from './product.module.css';

function resolveImg(src) {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/Foto Produk/')) return src;
  return `${STORAGE}${src}`;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [activeImg, setActiveImg] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProduct(slug),
  });

  const product = data?.data;
  const related = data?.related ?? [];

  if (isLoading) return (
    <div className={styles.page}>
      <div className={`container ${styles.detail}`}>
        <div className={`skeleton ${styles.imgSkeleton}`} />
        <div className={styles.infoSkeleton}>
          {[60, 40, 80, 100, 60].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: i === 0 ? 32 : 16, width: `${w}%`, marginBottom: 16 }} />
          ))}
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--gray-mid)', marginBottom: 24 }}>Produk tidak ditemukan.</p>
        <Link href="/" className="btn btn-dark">Kembali ke Home</Link>
      </div>
    </div>
  );

  const images = product.images ?? [];
  const features = product.features ?? [];

  return (
    <div className={styles.page}>
      <div className={`container ${styles.detail}`}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <motion.div className={styles.mainImg}
            key={activeImg}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            {images[activeImg] ? (
              <Image src={resolveImg(images[activeImg])} alt={product.name} fill sizes="600px" className={styles.mainPhoto} />
            ) : (
              <div className={styles.imgPlaceholder}>
                <span>Savana Taylor</span>
              </div>
            )}
          </motion.div>
          {images.length > 1 && (
            <div className={styles.thumbRow}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}>
                  <Image src={resolveImg(img)} alt="" fill sizes="80px" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <motion.div className={styles.info}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <span className={`label ${styles.categoryTag}`}>{product.category?.name}</span>
          <h1 className={`heading-xl ${styles.productName}`}>{product.name}</h1>
          <p className={styles.price}>{product.price_display}</p>
          <div className="gold-line" style={{ margin: '24px 0' }} />

          {product.description && (
            <p className={`body-lg ${styles.desc}`}>{product.description}</p>
          )}

          {features.length > 0 && (
            <ul className={styles.features}>
              {features.map((f, i) => (
                <motion.li key={i} className={styles.feature}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}>
                  <span className={styles.featureDot} />
                  {f}
                </motion.li>
              ))}
            </ul>
          )}

          <div className={styles.actions}>
            <a href={product.whatsapp_url} target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${styles.waBtn}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.354 8.354 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Pesan via WhatsApp
            </a>
            <Link href={`/${product.category?.slug}`} className="btn btn-outline">Lihat Koleksi</Link>
          </div>

          <div className={styles.waNote}>
            * Anda akan diarahkan ke WhatsApp untuk konsultasi ukuran dan pemesanan
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="label" style={{ color: 'var(--gold)', display: 'block', marginBottom: 12 }}>Rekomendasi</span>
              <h2 className="heading-lg">Produk Lainnya</h2>
              <div className="gold-line gold-line-center" style={{ marginTop: 20 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
