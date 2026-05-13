import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';

const products = [
    {
        id: 1,
        name: 'PDUK Pimpinan',
        category: 'Baju Dinas',
        image: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG',
        priceFrom: 'Rp 2.500.000',
    },
    {
        id: 2,
        name: 'PDU Kejaksaan',
        category: 'Baju Dinas',
        image: '/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG',
        priceFrom: 'Rp 2.000.000',
    },
    {
        id: 3,
        name: 'PDUK Pria',
        category: 'Baju Dinas',
        image: '/Foto Produk/Taruh di Man (PDUK).PNG',
        priceFrom: 'Rp 2.500.000',
    },
    {
        id: 4,
        name: 'Baju Dinas Lapangan',
        category: 'PDL',
        image: '/Foto Produk/Baju Dinas Lapagan.PNG',
        priceFrom: 'Rp 1.500.000',
    },
    {
        id: 5,
        name: 'Kemeja Formal',
        category: 'Formal Wear',
        image: '/Foto Produk/Kemeja.PNG',
        priceFrom: 'Rp 800.000',
    },
    {
        id: 6,
        name: 'Kemeja Lengan Pendek',
        category: 'Formal Wear',
        image: '/Foto Produk/Lengan Pendek.PNG',
        priceFrom: 'Rp 750.000',
    },
    {
        id: 7,
        name: 'Jas Formal Premium',
        category: 'Formal Wear',
        image: '/Foto Produk/IMG_6942.PNG',
        priceFrom: 'Rp 2.800.000',
    },
    {
        id: 8,
        name: 'Seragam Dinas Formal',
        category: 'Baju Dinas',
        image: '/Foto Produk/IMG_6941.PNG',
        priceFrom: 'Rp 1.800.000',
    },
    {
        id: 9,
        name: 'One Set Formal',
        category: 'Formal Wear',
        image: '/Foto Produk/IMG_6943.PNG',
        priceFrom: 'Rp 3.500.000',
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

export default function MenCollectionPage() {
    return (
        <>
            <Helmet>
                <title>Men Collection — Savana Taylor Boutique</title>
                <meta name="description" content="Koleksi pakaian pria premium: baju dinas, jas formal, kemeja, one set formal. Custom made untuk profesional." />
            </Helmet>

            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle
                        subtitle="Men's Collection"
                        title="Koleksi Pria"
                        description="Baju dinas, formal wear, dan custom tailoring premium untuk pria profesional."
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
                                href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20tertarik%20dengan%20koleksi%20pria"
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
