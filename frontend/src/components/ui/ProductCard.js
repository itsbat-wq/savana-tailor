'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { STORAGE } from '@/lib/api';

/**
 * Resolve image source:
 * - Absolute URL → use as-is
 * - /storage/...  → prepend Laravel server (uploaded via admin)
 * - /Foto Produk/ → these are served from Next.js public/ folder (copied there)
 * - anything else → prepend Laravel server
 */
function resolveImg(src) {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/Foto Produk/') || src.startsWith('/Logo/')) return src;
  if (src.startsWith('/storage/')) return `${STORAGE}${src}`;
  return `${STORAGE}${src}`;
}

export default function ProductCard({ product, index = 0 }) {
  const img = resolveImg(product.images?.[0]);

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.slug}`} className={styles.imageWrap}>
        {img ? (
          <Image src={img} alt={product.name} fill sizes="(max-width:768px) 100vw, 400px" className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span>Savana Taylor</span>
          </div>
        )}
        <div className={styles.overlay}>
          <span className={`label ${styles.overlayText}`}>View Details</span>
        </div>
        {product.is_featured && <span className={styles.badge}>Bestseller</span>}
      </Link>

      <div className={styles.info}>
        <span className={`label ${styles.category}`}>{product.category?.name}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price_display}</p>
      </div>

      <a
        href={product.whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-dark ${styles.waBtn}`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.354 8.354 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        Pesan via WhatsApp
      </a>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrap} skeleton`} style={{ borderRadius: 0 }} />
      <div className={styles.info}>
        <div className="skeleton" style={{ height: 10, width: 80, marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: 100 }} />
      </div>
    </div>
  );
}
