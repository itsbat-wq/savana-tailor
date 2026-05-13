import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import ScrollReveal from '../../components/shared/ScrollReveal';
import './BajuDinasPage.css';

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'pdl', label: 'PDL' },
    { id: 'pdh', label: 'PDH' },
    { id: 'pdu', label: 'PDU' },
    { id: 'pidsus', label: 'PIDSUS' },
    { id: 'pidum', label: 'PIDUM' },
    { id: 'pembinaan', label: 'Pembinaan' },
    { id: 'adhyaksa', label: 'Adhyaksa' },
];

const products = [
    {
        id: 1,
        name: 'PDUK Pimpinan',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG',
        priceFrom: 'Rp 2.500.000',
    },
    {
        id: 2,
        name: 'PDU Kejaksaan Pria',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG',
        priceFrom: 'Rp 2.000.000',
    },
    {
        id: 3,
        name: 'PDUK Jaksa Perempuan',
        category: 'pdu',
        type: 'custom',
        gender: 'wanita',
        image: '/Foto Produk/PDUK Jaksa Perempuan.PNG',
        priceFrom: 'Rp 2.200.000',
    },
    {
        id: 4,
        name: 'PDUB Jaksa Perempuan',
        category: 'pdu',
        type: 'custom',
        gender: 'wanita',
        image: '/Foto Produk/PDUB Jaksa Perempuan.PNG',
        priceFrom: 'Rp 2.000.000',
    },
    {
        id: 5,
        name: 'Baju Dinas Lapangan (PDL)',
        category: 'pdl',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Baju Dinas Lapagan.PNG',
        priceFrom: 'Rp 1.500.000',
    },
    {
        id: 6,
        name: 'Pria PDUK & PDUB',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Pria PDUK & PDUB Wanita.PNG',
        priceFrom: 'Rp 2.300.000',
    },
    {
        id: 7,
        name: 'PDUK Pria',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Taruh di Man (PDUK).PNG',
        priceFrom: 'Rp 2.500.000',
    },
    {
        id: 8,
        name: 'Kemeja Dinas',
        category: 'pdh',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Kemeja.PNG',
        priceFrom: 'Rp 800.000',
    },
    {
        id: 9,
        name: 'PDH Lengan Pendek',
        category: 'pdh',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/Lengan Pendek.PNG',
        priceFrom: 'Rp 750.000',
    },
    {
        id: 10,
        name: 'Seragam Dinas Formal',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/IMG_6941.PNG',
        priceFrom: 'Rp 1.800.000',
    },
    {
        id: 11,
        name: 'Jas Dinas Premium',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/IMG_6942.PNG',
        priceFrom: 'Rp 2.800.000',
    },
    {
        id: 12,
        name: 'Seragam Dinas Lengkap',
        category: 'pdu',
        type: 'custom',
        gender: 'pria',
        image: '/Foto Produk/IMG_6943.PNG',
        priceFrom: 'Rp 3.000.000',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

export default function BajuDinasPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <>
            <Helmet>
                <title>Baju Dinas Kejaksaan — Savana Taylor Boutique</title>
                <meta name="description" content="Koleksi baju dinas kejaksaan premium: PDL, PDH, PDU, PIDSUS, PIDUM, Pembinaan, Adhyaksa. Custom made dengan kualitas terbaik." />
            </Helmet>

            {/* Hero */}
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle
                        subtitle="Koleksi Utama"
                        title="Baju Dinas Kejaksaan"
                        description="Koleksi lengkap baju dinas dengan kualitas premium, fitting sempurna, dan pengerjaan oleh craftsman berpengalaman 10+ tahun."
                        light
                    />
                </div>
            </div>

            {/* Info Section */}
            <section className="section" style={{ paddingBottom: '40px' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="dinas-info">
                            <div className="dinas-info__item">
                                <h4>One Set (Wajib)</h4>
                                <p>PDL, PDH, PDU — atasan + celana/rok sebagai satu set lengkap</p>
                            </div>
                            <div className="dinas-info__item">
                                <h4>Atasan</h4>
                                <p>PIDSUS, PIDUM, Pembinaan, Adhyaksa, Adhyaksa Intel — bisa request set</p>
                            </div>
                            <div className="dinas-info__item">
                                <h4>Custom Order</h4>
                                <p>Semua produk dibuat custom sesuai ukuran. Konsultasi via WhatsApp.</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filter & Products */}
            <section className="section" style={{ paddingTop: '0' }}>
                <div className="container">
                    {/* Category Filter */}
                    <ScrollReveal>
                        <div className="dinas-filter">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`dinas-filter__btn ${activeCategory === cat.id ? 'dinas-filter__btn--active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Product Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            className="dinas-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    transition={{ duration: 0.4 }}
                                    layout
                                >
                                    <Link to={`/product/${product.id}`} className="dinas-card">
                                        <div className="dinas-card__image">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />
                                            <div className="dinas-card__badge">
                                                {product.type === 'custom' ? 'Custom' : 'Ready'}
                                            </div>
                                            <div className="dinas-card__overlay">
                                                <span className="btn btn-white">Lihat Detail</span>
                                            </div>
                                        </div>
                                        <div className="dinas-card__info">
                                            <span className="dinas-card__category">{product.category.toUpperCase()}</span>
                                            <h3 className="dinas-card__name">{product.name}</h3>
                                            <p className="dinas-card__price">Mulai dari {product.priceFrom}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* CTA */}
                    <ScrollReveal>
                        <div className="dinas-cta">
                            <p>Tidak menemukan yang Anda cari? Konsultasikan kebutuhan Anda langsung.</p>
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20bertanya%20tentang%20baju%20dinas"
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
