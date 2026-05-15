'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import styles from './catalog.module.css';

export default function CatalogClient({ categorySlug, title, subtitle }) {
  const [sort, setSort] = useState('default');
  const [activeType, setActiveType] = useState('all');

  const { data, isLoading } = useQuery({
    queryKey: ['products', categorySlug],
    queryFn: () => getProducts({ category: categorySlug, per_page: 50 }),
  });

  const allProducts = data?.data ?? [];

  // Extract unique types/subcategories from products
  const types = useMemo(() => {
    const typeSet = new Set();
    allProducts.forEach(p => {
      if (p.type && p.type.trim()) typeSet.add(p.type.trim());
    });
    return Array.from(typeSet).sort();
  }, [allProducts]);

  // Filter by type
  let products = activeType === 'all' ? allProducts : allProducts.filter(p => p.type && p.type.trim() === activeType);

  // Sort
  if (sort === 'low') products = [...products].sort((a, b) => a.price - b.price);
  if (sort === 'high') products = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <motion.div className={`container ${styles.heroInner}`}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className={`label ${styles.heroLabel}`}>{subtitle}</span>
          <h1 className={`heading-xl ${styles.heroTitle}`}>{title}</h1>
          <div className="gold-line gold-line-center" />
        </motion.div>
      </div>

      <div className="container">
        {/* Subcategory Filter */}
        {types.length > 0 && (
          <div className={styles.filterBar}>
            <div className={styles.sortWrap}>
              <span className={`label ${styles.sortLabel}`}>Sub-kategori:</span>
              <select value={activeType} onChange={e => setActiveType(e.target.value)} className={styles.sortSelect}>
                <option value="all">Semua</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <p className={styles.count}>{isLoading ? '—' : `${products.length} produk`}</p>
          <div className={styles.sortWrap}>
            <span className={`label ${styles.sortLabel}`}>Urutkan:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} className={styles.sortSelect}>
              <option value="default">Default</option>
              <option value="low">Harga Terendah</option>
              <option value="high">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.length === 0
              ? <p className={styles.empty}>Belum ada produk di koleksi ini.</p>
              : products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)
          }
        </div>
      </div>
    </div>
  );
}
