import React from 'react';
import { Link } from 'react-router-dom';

// Skeleton card
export function SkeletonCard() {
    return (
        <div className="skeleton skeleton-card">
            <div className="skeleton skeleton-card__image"></div>
            <div className="skeleton-card__info">
                <div className="skeleton skeleton-line skeleton-line--short"></div>
                <div className="skeleton skeleton-line skeleton-line--medium"></div>
                <div className="skeleton skeleton-line skeleton-line--short"></div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 6 }) {
    return (
        <div className="dinas-grid">
            {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
    );
}

// Product card — shows real image + links to WA
export default function ProductCard({ product }) {
    const image = product.images?.[0];

    return (
        <div className="dinas-card" style={{ display: 'block' }}>
            <Link to={`/product/${product.slug}`} style={{ display: 'block' }}>
                <div className="dinas-card__image">
                    {image ? (
                        <img src={image} alt={product.name} loading="lazy" />
                    ) : (
                        <div className="dinas-card__placeholder">Foto Produk</div>
                    )}
                    <div className="dinas-card__overlay">
                        <span style={{ color: '#fff', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lihat Detail</span>
                    </div>
                </div>
                <div className="dinas-card__info">
                    <span className="dinas-card__category">{product.category?.name ?? product.category_id}</span>
                    <h3 className="dinas-card__name">{product.name}</h3>
                    <p className="dinas-card__price">{product.price_display}</p>
                </div>
            </Link>
            <div style={{ padding: '0 20px 20px' }}>
                <a
                    href={product.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '10px 16px' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Pesan via WhatsApp
                </a>
            </div>
        </div>
    );
}
