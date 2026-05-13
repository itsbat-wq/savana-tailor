import React from 'react';
import SectionTitle from '../../components/shared/SectionTitle';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <>
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle subtitle="Our Story" title="Tentang Kami" description="Mengenal lebih dekat Savana Taylor Boutique." light />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="about-story">
                        <div className="about-story__image"><img src="/Foto Produk/IMG_7054.PNG" alt="Workshop" loading="lazy" /></div>
                        <div className="about-story__content">
                            <h3>10+ Tahun Melayani Profesional Indonesia</h3>
                            <p>Savana Taylor Boutique didirikan dengan satu visi: menyediakan pakaian premium custom made yang mencerminkan keanggunan dan profesionalisme pemakainya.</p>
                            <p>Berawal dari melayani kebutuhan baju dinas kejaksaan, kami berkembang menjadi one-stop solution untuk kebutuhan pakaian formal profesional.</p>
                            <div className="gold-divider" />
                            <p style={{fontStyle:'italic',color:'var(--color-maroon)'}}>"Custom Made • Exclusive • Elegant • Timeless"</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
