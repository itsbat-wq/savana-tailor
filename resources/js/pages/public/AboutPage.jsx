import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <>
            <Helmet>
                <title>About Us — Savana Taylor Boutique</title>
                <meta name="description" content="Tentang Savana Taylor Boutique. 10+ tahun pengalaman melayani profesional Indonesia dengan pakaian premium custom made." />
            </Helmet>

            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle
                        subtitle="Our Story"
                        title="Tentang Kami"
                        description="Mengenal lebih dekat Savana Taylor Boutique dan perjalanan kami melayani profesional Indonesia."
                        light
                    />
                </div>
            </div>

            {/* Story Section */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="about-story">
                            <div className="about-story__image">
                                <img
                                    src="/Foto Produk/IMG_7054.PNG"
                                    alt="Savana Taylor Boutique Workshop"
                                    loading="lazy"
                                />
                            </div>
                            <div className="about-story__content">
                                <h3>10+ Tahun Melayani Profesional Indonesia</h3>
                                <p>
                                    Savana Taylor Boutique didirikan dengan satu visi: menyediakan pakaian
                                    premium custom made yang mencerminkan keanggunan dan profesionalisme
                                    pemakainya.
                                </p>
                                <p>
                                    Berawal dari melayani kebutuhan baju dinas kejaksaan, kami berkembang
                                    menjadi one-stop solution untuk kebutuhan pakaian formal profesional —
                                    dari baju dinas, jas, kemeja, hingga kebaya dan dress.
                                </p>
                                <p>
                                    Dengan pengalaman lebih dari 10 tahun dan ribuan klien yang puas,
                                    kami berkomitmen untuk terus memberikan kualitas terbaik dalam setiap
                                    jahitan.
                                </p>
                                <div className="gold-divider" />
                                <p style={{ fontStyle: 'italic', color: 'var(--color-maroon)' }}>
                                    "Custom Made • Exclusive • Elegant • Timeless"
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: 'var(--color-cream)' }}>
                <div className="container">
                    <SectionTitle
                        subtitle="Our Values"
                        title="Mengapa Savana Taylor?"
                    />
                    <motion.div
                        className="about-values"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {[
                            {
                                title: 'Kualitas Premium',
                                desc: 'Hanya menggunakan bahan terbaik dan dikerjakan oleh craftsman berpengalaman.',
                            },
                            {
                                title: 'Fitting Sempurna',
                                desc: 'Pengukuran presisi dan garansi penyesuaian hingga pakaian pas sempurna.',
                            },
                            {
                                title: 'Layanan Personal',
                                desc: 'Konsultasi one-on-one untuk memastikan setiap detail sesuai keinginan Anda.',
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                className="about-value"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5 }}
                            >
                                <h4>{value.title}</h4>
                                <p>{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Target Market */}
            <section className="section">
                <div className="container">
                    <SectionTitle
                        subtitle="Our Clients"
                        title="Siapa yang Kami Layani"
                        description="Kami melayani profesional dari berbagai institusi dan latar belakang."
                    />
                    <motion.div
                        className="about-values"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {[
                            { title: 'Kejaksaan', desc: 'Baju dinas lengkap: PDL, PDH, PDU, PIDSUS, PIDUM, dan lainnya.' },
                            { title: 'Pengacara', desc: 'Jas formal, toga, dan pakaian sidang berkualitas premium.' },
                            { title: 'Profesional', desc: 'Formal wear untuk eksekutif, pejabat, dan profesional lainnya.' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="about-value"
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5 }}
                            >
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
