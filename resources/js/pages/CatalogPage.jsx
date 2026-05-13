import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/public';
import ProductCard, { SkeletonGrid } from '../components/ui/ProductCard';

export default function CatalogPage({ categorySlug, title, subtitle }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const [priceSort, setPriceSort] = useState('none');
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => { document.title = `${title} - Savana Taylor Boutique`; }, [title]);

    const { data, isLoading } = useQuery({
        queryKey: ['products', categorySlug],
        queryFn: () => fetchProducts({ category: categorySlug, per_page: 50 }),
    });

    const allProducts = data?.data ?? [];
    const categories = [...new Set(allProducts.map(p => p.category?.name).filter(Boolean))];

    let filtered = activeFilter === 'all' ? allProducts : allProducts.filter(p => p.category?.name === activeFilter);
    if (priceSort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (priceSort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);

    return (
        <div>
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <div className="section-title section-title--center section-title--light">
                        <span className="section-title__subtitle">{subtitle}</span>
                        <h1 className="section-title__heading heading-lg">{title}</h1>
                        <div className="gold-divider gold-divider-center" />
                    </div>
                </div>
            </div>
            <section className="section"><div className="container">
                {/* Filters */}
                <div className="catalog-filters">
                    <div className="catalog-filters__row">
                        <div className="catalog-filter-dropdown">
                            <button className="catalog-filter-dropdown__trigger" onClick={() => setFilterOpen(!filterOpen)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                                <span>{activeFilter === 'all' ? 'Kategori' : activeFilter}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {filterOpen && (
                                <div className="catalog-filter-dropdown__menu">
                                    <button className={`catalog-filter-dropdown__item ${activeFilter === 'all' ? 'catalog-filter-dropdown__item--active' : ''}`} onClick={() => { setActiveFilter('all'); setFilterOpen(false); }}>Semua</button>
                                    {categories.map(c => (
                                        <button key={c} className={`catalog-filter-dropdown__item ${activeFilter === c ? 'catalog-filter-dropdown__item--active' : ''}`} onClick={() => { setActiveFilter(c); setFilterOpen(false); }}>{c}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <select className="catalog-filter-dropdown__select" value={priceSort} onChange={e => setPriceSort(e.target.value)}>
                            <option value="none">Harga</option>
                            <option value="low">Termurah</option>
                            <option value="high">Termahal</option>
                        </select>
                    </div>
                    {activeFilter !== 'all' && (
                        <div className="catalog-filters__active">
                            <span>Filter: <strong>{activeFilter}</strong></span>
                            <button onClick={() => setActiveFilter('all')}>&times; Reset</button>
                        </div>
                    )}
                </div>

                {isLoading
                    ? <SkeletonGrid count={6} />
                    : filtered.length === 0
                        ? <p style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>Tidak ada produk untuk filter ini.</p>
                        : <div className="dinas-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
                }
            </div></section>
        </div>
    );
}
