import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../api/public';
import ProductCard, { SkeletonCard } from '../components/ui/ProductCard';

export default function ProductDetailPage() {
    const { slug } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => fetchProduct(slug),
    });

    const product = data?.data;
    const related = data?.related ?? [];

    useEffect(() => {
        if (product) document.title = `${product.name} - Savana Taylor Boutique`;
    }, [product]);

    if (isLoading) {
        return (
            <div style={{ paddingTop: '100px' }} className="section">
                <div className="container">
                    <div className="product-detail">
                        <div className="skeleton" style={{ aspectRatio: '3/4', width: '100%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[80, 40, 60, 100].map((w, i) => <div key={i} className="skeleton skeleton-line" style={{ width: `${w}%`, height: 20 }} />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return <div style={{ paddingTop: 140, textAlign: 'center' }}><p>Produk tidak ditemukan.</p><Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Kembali ke Home</Link></div>;

    const images = product.images ?? [];
    const features = product.features ?? ['Cutting modern & sleek', 'Nyaman dipakai', 'Bisa custom ukuran', 'Tampil profesional & percaya diri'];

    return (
        <div>
            <div style={{ paddingTop: '100px' }} className="section">
                <div className="container">
                    <div className="product-detail">
                        <div className="product-detail__image">
                            {images[0]
                                ? <img src={images[0]} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top' }} />
                                : <div className="dinas-card__placeholder" style={{ height: 400 }}>Foto Produk</div>
                            }
                            {/* Thumbnail row if multiple images */}
                            {images.length > 1 && (
                                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                    {images.slice(1).map((img, i) => (
                                        <img key={i} src={img} alt={`${product.name} ${i + 2}`} style={{ width: 80, height: 80, objectFit: 'cover', border: '1px solid #ddd' }} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="product-detail__info">
                            <span className="dinas-card__category">{product.category?.name}</span>
                            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '8px 0 16px' }}>{product.name}</h1>
                            <p style={{ fontSize: '1.5rem', color: 'var(--color-maroon)', fontWeight: 700, marginBottom: 24 }}>{product.price_display}</p>
                            <div className="gold-divider" />
                            {product.description && <p style={{ margin: '16px 0', fontSize: '0.9rem', color: 'rgba(17,17,17,0.7)', lineHeight: 1.8 }}>{product.description}</p>}
                            <ul style={{ margin: '20px 0', fontSize: '0.9rem', color: 'rgba(17,17,17,0.7)', lineHeight: 2 }}>
                                {features.map((f, i) => <li key={i}>&#10003; {f}</li>)}
                            </ul>
                            <a href={product.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', marginTop: 20 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                Pesan via WhatsApp
                            </a>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(17,17,17,0.5)', marginTop: 12, textAlign: 'center' }}>* Anda akan diarahkan ke WhatsApp untuk konsultasi & pemesanan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="section" style={{ background: 'var(--color-cream)' }}>
                    <div className="container">
                        <div className="section-title section-title--center">
                            <span className="section-title__subtitle">Rekomendasi</span>
                            <h2 className="section-title__heading heading-lg">Produk Lainnya</h2>
                            <div className="gold-divider gold-divider-center" />
                        </div>
                        <div className="bestseller__grid">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
