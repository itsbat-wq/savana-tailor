import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import './BestSeller.css';

// Products with real images from the Foto Produk folder
const products = [
    {
        id: 1,
        name: 'PDUK Pimpinan',
        category: 'Baju Dinas',
        priceFrom: 'Rp 2.500.000',
        slug: 'pduk-pimpinan',
        image: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG',
    },
    {
        id: 2,
        name: 'PDU Kejaksaan',
        category: 'Baju Dinas',
        priceFrom: 'Rp 2.000.000',
        slug: 'pdu-kejaksaan',
        image: '/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG',
    },
    {
        id: 3,
        name: 'PDUK Jaksa Perempuan',
        category: 'Baju Dinas',
        priceFrom: 'Rp 2.200.000',
        slug: 'pduk-jaksa-perempuan',
        image: '/Foto Produk/PDUK Jaksa Perempuan.PNG',
    },
    {
        id: 4,
        name: 'Baju Dinas Lapangan',
        category: 'Baju Dinas',
        priceFrom: 'Rp 1.500.000',
        slug: 'baju-dinas-lapangan',
        image: '/Foto Produk/Baju Dinas Lapagan.PNG',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function BestSeller() {
    return (
        <section className="bestseller section">
            <div className="container">
                <SectionTitle
                    subtitle="Best Sellers"
                    title="Produk Terpopuler"
                    description="Pilihan favorit klien kami yang telah terbukti kualitasnya."
                />

                <motion.div
                    className="bestseller__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to={`/product/${product.slug}`} className="bestseller__card">
                                <div className="bestseller__card-image">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="bestseller__card-img"
                                        loading="lazy"
                                    />
                                    <div className="bestseller__card-overlay">
                                        <span className="btn btn-white">View Detail</span>
                                    </div>
                                </div>
                                <div className="bestseller__card-info">
                                    <span className="bestseller__card-category">{product.category}</span>
                                    <h3 className="bestseller__card-name">{product.name}</h3>
                                    <p className="bestseller__card-price">Mulai dari {product.priceFrom}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="bestseller__cta"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/baju-dinas" className="btn btn-primary">
                        Lihat Semua Produk <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
