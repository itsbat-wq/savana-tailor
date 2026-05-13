import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../api/public';

export default function ContactPage() {
    useEffect(() => { document.title = 'Contact - Savana Taylor Boutique'; }, []);
    const { data } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
    const c = data?.data?.contact ?? {};
    const wa = c.whatsapp ?? '6281317935360';

    return (
        <div>
            <div className="page-hero page-hero--black">
                <div className="container"><div className="section-title section-title--center section-title--light">
                    <span className="section-title__subtitle">Get In Touch</span>
                    <h1 className="section-title__heading heading-lg">Hubungi Kami</h1>
                    <div className="gold-divider gold-divider-center" />
                </div></div>
            </div>
            <section className="section"><div className="container"><div className="contact-grid">
                <div className="contact-info">
                    {[['WhatsApp', c.phone ?? '081317935360', `https://wa.me/${wa}`], ['Instagram', c.instagram ?? '@savanatailorboutique', 'https://instagram.com/savanatailorboutique'], ['TikTok', c.tiktok ?? '@savanatailorboutique', 'https://tiktok.com/@savanatailorboutique'], ['Lokasi', c.location ?? 'Jakarta Utara', null], ['Jam Operasional', 'By Appointment Only', null]].map(([title, text, href]) => (
                        <div key={title} className="contact-info__card">
                            <h4 className="contact-info__title">{title}</h4>
                            <p className="contact-info__text">{href ? <a href={href} target="_blank" rel="noopener noreferrer">{text}</a> : text}</p>
                        </div>
                    ))}
                </div>
                <div className="contact-cta-card">
                    <h3 className="heading-sm">Book Appointment</h3>
                    <div className="gold-divider" />
                    <p>Hubungi kami via WhatsApp untuk konsultasi dan pengukuran.</p>
                    <div className="contact-cta-card__note"><strong>Penting:</strong> Walk-in tidak dilayani.</div>
                    <a href={`https://wa.me/${wa}?text=${encodeURIComponent('Halo Savana Taylor, saya ingin book appointment')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>Book via WhatsApp</a>
                </div>
            </div></div></section>
        </div>
    );
}
