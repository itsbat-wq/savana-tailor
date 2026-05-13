import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedProducts, fetchSettings } from '../api/public';
import ProductCard, { SkeletonCard } from '../components/ui/ProductCard';

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function HomePage() {
    useEffect(() => { document.title = 'Savana Taylor Boutique - Premium Tailor Jakarta'; }, []);

    const { data: settingsData } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
    const { data: featuredData, isLoading } = useQuery({ queryKey: ['featured'], queryFn: fetchFeaturedProducts });

    const settings = settingsData?.data ?? {};
    const hero = settings.hero ?? {};
    const stats = settings.stats ?? {};
    const contact = settings.contact ?? {};
    const wa = contact.whatsapp ?? '6281317935360';

    const featured = featuredData?.data ?? [];

    return (
        <div>
            {/* HERO */}
            <section className="hero">
                <div className="hero__bg">
                    <img src={hero.hero_image ?? '/Foto Produk/IMG_7054.PNG'} alt="" className="hero__bg-img" />
                </div>
                <div className="hero__overlay" />
                <div className="hero__content container">
                    <span className="hero__subtitle">{hero.hero_subtitle ?? 'Custom Made • Exclusive • Elegant • Timeless'}</span>
                    <h1 className="hero__title heading-xl">
                        {hero.hero_title ?? 'Crafting Elegance,'}<br />
                        <span className="hero__title-accent">Defining Excellence</span>
                    </h1>
                    <p className="hero__desc">{hero.hero_description ?? 'Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring.'}</p>
                    <div className="hero__actions">
                        <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Savana Taylor, saya ingin book appointment')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Appointment</a>
                        <Link to="/baju-dinas" className="btn btn-secondary">Explore Collection</Link>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat"><span className="hero__stat-number">{stats.stat_years ?? '10+'}</span><span className="hero__stat-label">{stats.stat_years_label ?? 'Tahun Pengalaman'}</span></div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat"><span className="hero__stat-number">{stats.stat_cities ?? '30+'}</span><span className="hero__stat-label">{stats.stat_cities_label ?? 'Kota Dilayani'}</span></div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat"><span className="hero__stat-number">{stats.stat_custom ?? '100%'}</span><span className="hero__stat-label">{stats.stat_custom_label ?? 'Custom Made'}</span></div>
                    </div>
                </div>
            </section>

            {/* USP */}
            <section className="usp section">
                <div className="container"><div className="usp__grid">
                    {[['Cutting modern & sleek', 'Desain modern dengan potongan presisi'], ['Nyaman dipakai', 'Bahan premium yang breathable dan nyaman'], ['Bisa custom ukuran', 'Setiap pakaian dibuat sesuai ukuran Anda'], ['Tampil profesional & percaya diri', 'Tingkatkan kepercayaan diri Anda']].map(([t, d], i) => (
                        <div key={i} className="usp__card"><h3 className="usp__title">{t}</h3><p className="usp__desc">{d}</p></div>
                    ))}
                </div></div>
            </section>

            {/* BEST SELLERS */}
            <section className="bestseller section">
                <div className="container">
                    <div className="section-title section-title--center">
                        <span className="section-title__subtitle">Best Sellers</span>
                        <h2 className="section-title__heading heading-lg">Produk Terpopuler</h2>
                        <div className="gold-divider gold-divider-center" />
                    </div>
                    <div className="bestseller__grid">
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                            : featured.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)
                        }
                    </div>
                    <div className="bestseller__cta"><Link to="/baju-dinas" className="btn btn-primary">Lihat Semua Produk</Link></div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta section">
                <div className="container"><div className="cta__card"><div className="cta__content">
                    <h2 className="cta__title heading-md">Siap Untuk Tampil <span className="text-gold">Lebih Berkelas?</span></h2>
                    <p className="cta__desc">Book appointment sekarang. Konsultasi gratis. Pertemuan harus dengan janji terlebih dahulu.</p>
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn btn-white">Chat WhatsApp</a>
                </div></div></div>
            </section>
        </div>
    );
}
