import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRentals } from '../api/public';
import { SkeletonGrid } from '../components/ui/ProductCard';

export default function RentalPage() {
    useEffect(() => { document.title = 'Rental - Savana Taylor Boutique'; }, []);
    const { data, isLoading } = useQuery({ queryKey: ['rentals'], queryFn: fetchRentals });
    const rentals = data?.data ?? [];

    return (
        <div>
            <div className="page-hero page-hero--black">
                <div className="container"><div className="section-title section-title--center section-title--light">
                    <span className="section-title__subtitle">Service</span>
                    <h1 className="section-title__heading heading-lg">Rental</h1>
                    <div className="gold-divider gold-divider-center" />
                    <p className="section-title__desc">Sewa pakaian formal premium untuk acara spesial.</p>
                </div></div>
            </div>
            <section className="section"><div className="container">
                {isLoading ? <SkeletonGrid count={4} /> : rentals.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ opacity: 0.6 }}>Info rental: hubungi kami via WhatsApp.</p>
                        <a href="https://wa.me/6281317935360" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 20 }}>Chat WhatsApp</a>
                    </div>
                ) : (
                    <div className="dinas-grid">
                        {rentals.map(r => (
                            <div key={r.id} className="dinas-card">
                                <div className="dinas-card__image">
                                    {r.images?.[0] ? <img src={r.images[0]} alt={r.name} loading="lazy" /> : <div className="dinas-card__placeholder">Foto Rental</div>}
                                </div>
                                <div className="dinas-card__info">
                                    <h3 className="dinas-card__name">{r.name}</h3>
                                    <p className="dinas-card__price">{r.price_display}</p>
                                    {r.description && <p style={{ fontSize: '0.8rem', marginTop: 8, color: 'rgba(17,17,17,0.6)' }}>{r.description}</p>}
                                </div>
                                <div style={{ padding: '0 20px 20px' }}>
                                    <a href={r.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', fontSize: '0.75rem', padding: '10px 16px' }}>
                                        Tanya via WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div></section>
        </div>
    );
}
