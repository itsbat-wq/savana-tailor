import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Ruler, Package, ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';
import './CustomTailorPage.css';

const steps = [
    {
        icon: MessageSquare,
        number: '01',
        title: 'Konsultasi',
        desc: 'Hubungi kami via WhatsApp untuk diskusikan kebutuhan, model, dan preferensi Anda. Konsultasi awal gratis.',
    },
    {
        icon: Palette,
        number: '02',
        title: 'Pilih Bahan',
        desc: 'Pilih dari koleksi bahan premium kami. Tersedia berbagai jenis kain berkualitas tinggi dari supplier terpercaya.',
    },
    {
        icon: Ruler,
        number: '03',
        title: 'Pengukuran',
        desc: 'Tim kami akan melakukan pengukuran presisi. Bisa datang ke workshop atau kami yang datang (by appointment).',
    },
    {
        icon: Package,
        number: '04',
        title: 'Produksi & Delivery',
        desc: 'Pengerjaan oleh craftsman berpengalaman 10+ tahun. Fitting review sebelum finishing. Diantar ke alamat Anda.',
    },
];

const fabrics = [
    { name: 'Wool Premium', desc: 'Untuk jas dan formal wear' },
    { name: 'Cotton Twill', desc: 'Untuk baju dinas dan kemeja' },
    { name: 'Polyester Blend', desc: 'Tahan lama, mudah perawatan' },
    { name: 'Silk', desc: 'Untuk kebaya dan dress premium' },
    { name: 'Linen', desc: 'Breathable, cocok iklim tropis' },
    { name: 'Gabardine', desc: 'Untuk celana formal' },
];

export default function CustomTailorPage() {
    return (
        <>
            <Helmet>
                <title>Custom Tailor — Savana Taylor Boutique</title>
                <meta name="description" content="Layanan custom tailor premium Savana Taylor. Konsultasi gratis, bahan berkualitas, pengukuran presisi, dan pengerjaan oleh craftsman berpengalaman." />
            </Helmet>

            {/* Hero */}
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle
                        subtitle="Our Process"
                        title="Custom Tailor"
                        description="Buat pakaian impian Anda dengan proses yang mudah dan hasil yang sempurna. Setiap detail dikerjakan dengan presisi."
                        light
                    />
                </div>
            </div>

            {/* Process Steps */}
            <section className="section">
                <div className="container">
                    <div className="custom-steps">
                        {steps.map((step, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="custom-step">
                                    <div className="custom-step__number">{step.number}</div>
                                    <div className="custom-step__icon">
                                        <step.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="custom-step__content">
                                        <h3 className="custom-step__title">{step.title}</h3>
                                        <p className="custom-step__desc">{step.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fabric Section */}
            <section className="section" style={{ background: 'var(--color-cream)' }}>
                <div className="container">
                    <SectionTitle
                        subtitle="Materials"
                        title="Pilihan Bahan Premium"
                        description="Kami hanya menggunakan bahan berkualitas tinggi dari supplier terpercaya."
                    />
                    <motion.div
                        className="custom-fabrics"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                    >
                        {fabrics.map((fabric, index) => (
                            <motion.div
                                key={index}
                                className="custom-fabric"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.4 }}
                            >
                                <h4>{fabric.name}</h4>
                                <p>{fabric.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="custom-cta">
                            <h2 className="heading-md">Siap Mulai?</h2>
                            <div className="gold-divider gold-divider-center" />
                            <p>
                                Hubungi kami sekarang untuk konsultasi gratis. Tim kami siap membantu
                                mewujudkan pakaian impian Anda.
                            </p>
                            <div className="custom-cta__actions">
                                <a
                                    href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20custom%20tailor"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Chat WhatsApp <ArrowRight size={16} />
                                </a>
                                <a href="tel:+6281234567890" className="btn btn-secondary">
                                    Telepon Kami
                                </a>
                            </div>
                            <p className="custom-cta__note">
                                * Pertemuan harus dengan janji terlebih dahulu
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
