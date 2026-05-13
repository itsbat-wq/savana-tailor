import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import './BajuDinasPage.css';

const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'pdl', label: 'PDL' },
    { id: 'pdh', label: 'PDH' },
    { id: 'pdu', label: 'PDU' },
];

const products = [
    { id: 1, name: 'PDUK Pimpinan', category: 'pdu', type: 'custom', image: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG', priceFrom: 'Rp 2.500.000' },
    { id: 2, name: 'PDU Kejaksaan Pria', category: 'pdu', type: 'custom', image: '/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG', priceFrom: 'Rp 2.000.000' },
    { id: 3, name: 'PDUK Jaksa Perempuan', category: 'pdu', type: 'custom', image: '/Foto Produk/PDUK Jaksa Perempuan.PNG', priceFrom: 'Rp 2.200.000' },
    { id: 4, name: 'PDUB Jaksa Perempuan', category: 'pdu', type: 'custom', image: '/Foto Produk/PDUB Jaksa Perempuan.PNG', priceFrom: 'Rp 2.000.000' },
    { id: 5, name: 'Baju Dinas Lapangan (PDL)', category: 'pdl', type: 'custom', image: '/Foto Produk/Baju Dinas Lapagan.PNG', priceFrom: 'Rp 1.500.000' },
    { id: 6, name: 'Kemeja Dinas', category: 'pdh', type: 'custom', image: '/Foto Produk/Kemeja.PNG', priceFrom: 'Rp 800.000' },
    { id: 7, name: 'PDH Lengan Pendek', category: 'pdh', type: 'custom', image: '/Foto Produk/Lengan Pendek.PNG', priceFrom: 'Rp 750.000' },
    { id: 8, name: 'PDUK Pria', category: 'pdu', type: 'custom', image: '/Foto Produk/Taruh di Man (PDUK).PNG', priceFrom: 'Rp 2.500.000' },
    { id: 9, name: 'Jas Dinas Premium', category: 'pdu', type: 'custom', image: '/Foto Produk/IMG_6942.PNG', priceFrom: 'Rp 2.800.000' },
];

export default function BajuDinasPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

    return (
        <>
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle subtitle="Koleksi Utama" title="Baju Dinas Kejaksaan" description="Koleksi lengkap baju dinas dengan kualitas premium dan fitting sempurna." light />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="dinas-filter">
                        {categories.map((cat) => (
                            <button key={cat.id} className={`dinas-filter__btn ${activeCategory === cat.id ? 'dinas-filter__btn--active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="dinas-grid">
                        {filteredProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="dinas-card">
                                <div className="dinas-card__image">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                    <div className="dinas-card__badge">{product.type === 'custom' ? 'Custom' : 'Ready'}</div>
                                    <div className="dinas-card__overlay"><span className="btn btn-white">Lihat Detail</span></div>
                                </div>
                                <div className="dinas-card__info">
                                    <span className="dinas-card__category">{product.category.toUpperCase()}</span>
                                    <h3 className="dinas-card__name">{product.name}</h3>
                                    <p className="dinas-card__price">Mulai dari {product.priceFrom}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="dinas-cta">
                        <p>Tidak menemukan yang Anda cari? Konsultasikan kebutuhan Anda langsung.</p>
                        <a href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20bertanya%20tentang%20baju%20dinas" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Chat WhatsApp</a>
                    </div>
                </div>
            </section>
        </>
    );
}
