import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';

const products = [
    {
        id: 1,
        name: 'PDUK Jaksa Perempuan',
        category: 'Baju Dinas',
        image: '/Foto Produk/PDUK Jaksa Perempuan.PNG',
        priceFrom: 'Rp 2.200.000',
    },
    {
        id: 2,
        name: 'PDUB Jaksa Perempuan',
        category: 'Baju Dinas',
        image: '/Foto Produk/PDUB Jaksa Perempuan.PNG',
        priceFrom: 'Rp 2.000.000',
    },
    {
        id: 3,
        name: 'Pria PDUK & PDUB Wanita',
        category: 'Baju Dinas',
        image: '/Foto Produk/Pria PDUK & PDUB Wanita.PNG',
        priceFrom: 'Rp 2.300.000',
    },
    {
        id: 4,
        name: 'Kebaya Modern',
        category: 'Kebaya',
        image: '/Foto Produk/IMG_7105.PNG',
        priceFrom: 'Rp 2.000.000',
    },
    {
        id: 5,
        name: 'Dress Formal',
        category: 'Dress',
        image: '/Foto Produk/IMG_7106.PNG',
        priceFrom: 'Rp 1.800.000',
    },
    {
        id: 6,
        name: 'Jas Wanita Premium',
        category: 'Formal Wear',
        image: '/Foto Produk/IMG_7107.PNG',
        priceFrom: 'Rp 2.500.000',
    },
    {
        id: 7,
        name: 'One Set Wanita',
        category: 'Formal Wear',
        image: '/Foto Produk/IMG_7108.PNG',
        priceFrom: 'Rp 3.000.000',
    },
    {
        id: 8,
        name: 'Batik Wanita',
        category: 'Batik',
        image: '/Foto Produk/IMG_7109.PNG',
        priceFrom: 'Rp 1.200.000',
    },
    {
        id: 9,
        name: 'Kemeja Wanita',
        category: 'Formal Wear',
        image: '/Foto Produk/IMG_7110.PNG',
        priceFrom: 'Rp 900.000',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function WomenCollectionPage() {
    return (
        <>
            <Helmet>
                <title>Women Collection — Savana Taylor Boutique</title>
                <meta name="description" content="Koleksi pakaian wanita premium: kebaya, dress, batik, jas wanita, baju dinas. Custom made untuk profesional wanita." />
            </Helmet>

            <div className="page-hero page-hero--gold">
                <div className="container">
                    <SectionTitle
                        subtitle="Women's Collection"
                        title="Koleksi Wanita"
                        description="Kebaya, dress, batik, jas wanita, dan baju dinas untuk wanita profesional yang tampil berkelas."
                        light
                    />
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <motion.div
                        className="dinas-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                transition={{ duration: 0.4 }}
                            >
                                <Link to={`/product/${product.id}`} className="dinas-card">
                                    <div className="dinas-card__image">
                                        <img src={product.image} alt={product.name} loading="lazy" />
                                        <div className="dinas-card__badge">Custom</div>
                                        <div className="dinas-card__overlay">
                                            <span className="btn btn-white">Lihat Detail</span>
                                        </div>
                                    </div>
                                    <div className="dinas-card__info">
                                        <span className="dinas-card__category">{product.category}</span>
                                        <h3 className="dinas-card__name">{product.name}</h3>
                                        <p className="dinas-card__price">Mulai dari {product.priceFrom}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <ScrollReveal>
                        <div className="dinas-cta" style={{ marginTop: '60px' }}>
                            <p>Ingin custom sesuai kebutuhan Anda? Konsultasi gratis via WhatsApp.</p>
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20tertarik%20dengan%20koleksi%20wanita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Chat WhatsApp
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
