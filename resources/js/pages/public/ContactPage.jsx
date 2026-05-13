import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, AtSign, ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';
import './ContactPage.css';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Alamat',
        lines: ['Jakarta, Indonesia', '(Alamat lengkap akan ditampilkan)'],
    },
    {
        icon: Phone,
        title: 'WhatsApp',
        lines: ['+62 812-3456-7890'],
        link: 'https://wa.me/6281234567890',
    },
    {
        icon: AtSign,
        title: 'Social Media',
        lines: ['Instagram: @savanataylor', 'TikTok: @savanataylor'],
    },
    {
        icon: Clock,
        title: 'Jam Operasional',
        lines: ['Senin - Sabtu: 09:00 - 18:00', 'Minggu: Tutup', '* Pertemuan harus dengan janji'],
    },
];

export default function ContactPage() {
    return (
        <>
            <Helmet>
                <title>Contact — Savana Taylor Boutique</title>
                <meta name="description" content="Hubungi Savana Taylor Boutique untuk konsultasi dan appointment. WhatsApp, Instagram, TikTok, dan alamat workshop." />
            </Helmet>

            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle
                        subtitle="Get In Touch"
                        title="Hubungi Kami"
                        description="Konsultasikan kebutuhan pakaian Anda. Kami siap membantu mewujudkan tampilan terbaik Anda."
                        light
                    />
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            {contactInfo.map((item, index) => (
                                <ScrollReveal key={index} delay={index * 0.1}>
                                    <div className="contact-info__card">
                                        <div className="contact-info__icon">
                                            <item.icon size={22} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="contact-info__title">{item.title}</h4>
                                            {item.lines.map((line, i) => (
                                                <p key={i} className="contact-info__text">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>

                        {/* CTA Card */}
                        <ScrollReveal delay={0.3}>
                            <div className="contact-cta-card">
                                <h3 className="heading-sm">Book Appointment</h3>
                                <div className="gold-divider" />
                                <p>
                                    Untuk konsultasi dan pengukuran, silakan book appointment terlebih dahulu
                                    melalui WhatsApp kami.
                                </p>
                                <div className="contact-cta-card__note">
                                    <strong>Penting:</strong> Pertemuan harus dengan janji terlebih dahulu.
                                    Walk-in tidak dilayani.
                                </div>
                                <a
                                    href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20book%20appointment"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    Book via WhatsApp <ArrowRight size={16} />
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
