import React, { useEffect, useState } from 'react';

export default function AboutPage() {
    const [section, setSection] = useState('identity');
    useEffect(() => { document.title = 'About Us - Savana Taylor Boutique'; }, []);

    const sections = { identity: 'About Us', visi: 'Visi & Misi', excellence: 'Keunggulan', achievement: 'Achievement', positioning: 'Positioning' };

    return (
        <div>
            <div className="page-hero page-hero--maroon">
                <div className="container"><div className="section-title section-title--center section-title--light">
                    <span className="section-title__subtitle">Our Story</span>
                    <h1 className="section-title__heading heading-lg">About Us</h1>
                    <div className="gold-divider gold-divider-center" />
                </div></div>
            </div>
            <section className="section"><div className="container"><div className="about-layout">
                <aside className="about-sidebar">
                    {Object.entries(sections).map(([key, label]) => (
                        <button key={key} className={`about-sidebar__btn ${section === key ? 'about-sidebar__btn--active' : ''}`} onClick={() => setSection(key)}>{label}</button>
                    ))}
                </aside>
                <div className="about-content">
                    {section === 'identity' && (<div><h2 className="heading-sm">Siapa Kami</h2><div className="gold-divider" /><p>Savana Taylor Boutique adalah premium tailor boutique yang bergerak di bidang custom formal wear dan professional uniform untuk pria dan wanita. Selama kurang lebih 10 tahun, kami telah melayani berbagai kebutuhan pakaian formal dengan konsep eksklusif, elegan, dan profesional.</p></div>)}
                    {section === 'visi' && (<div><h2 className="heading-sm">Visi</h2><div className="gold-divider" /><p>Menjadi boutique tailor profesional terpercaya di Indonesia dalam bidang formal wear premium dan custom uniform.</p><h2 className="heading-sm" style={{ marginTop: 30 }}>Misi</h2><div className="gold-divider" /><ul><li>Menghadirkan produk berkualitas tinggi</li><li>Memberikan pelayanan profesional dan personal</li><li>Menjaga detail dan kualitas setiap produk</li><li>Membantu client tampil lebih percaya diri dan elegan</li></ul></div>)}
                    {section === 'excellence' && (<div><h2 className="heading-sm">Keunggulan Kami</h2><div className="gold-divider" /><h3 style={{ marginTop: 20, fontSize: '1rem', color: 'var(--color-maroon)' }}>Personalized Custom Tailoring</h3><ul><li>Menyesuaikan ukuran & kebutuhan client</li><li>Lebih presisi dan nyaman</li></ul><h3 style={{ marginTop: 20, fontSize: '1rem', color: 'var(--color-maroon)' }}>Premium Quality Materials</h3><ul><li>Tactical premium, Wool & semi wool</li><li>Detail finishing rapi</li></ul></div>)}
                    {section === 'achievement' && (<div><h2 className="heading-sm">Achievement & Portfolio</h2><div className="gold-divider" /><p>Selama lebih dari 10 tahun, kami telah membangun kepercayaan dengan berbagai client profesional dan instansi formal di Indonesia.</p><h3 style={{ marginTop: 20, fontSize: '1rem', color: 'var(--color-maroon)' }}>Wilayah Dilayani</h3><p>Aceh, Bangka Belitung, Sumatra, Riau, Palembang, Jawa, Bogor, Bandung, Depok, Kalimantan, Sulawesi, Bali, Medan, dan berbagai wilayah lainnya.</p></div>)}
                    {section === 'positioning' && (<div><h2 className="heading-sm">Market Positioning</h2><div className="gold-divider" /><p>Savana Taylor Boutique berada pada kategori premium tailor boutique yang mengutamakan kualitas bahan, detail pengerjaan, kenyamanan, dan pelayanan personal.</p><p style={{ marginTop: 20, fontStyle: 'italic', color: 'var(--color-gold)' }}>"Exclusive tailor experience for professionals who value quality, precision, and identity."</p></div>)}
                </div>
            </div></div></section>
        </div>
    );
}
