import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';

const products = [
    { id: 1, name: 'PDUK Jaksa Perempuan', category: 'Baju Dinas', image: '/Foto Produk/PDUK Jaksa Perempuan.PNG', priceFrom: 'Rp 2.200.000' },
    { id: 2, name: 'PDUB Jaksa Perempuan', category: 'Baju Dinas', image: '/Foto Produk/PDUB Jaksa Perempuan.PNG', priceFrom: 'Rp 2.000.000' },
    { id: 3, name: 'Kebaya Modern', category: 'Kebaya', image: '/Foto Produk/IMG_7105.PNG', priceFrom: 'Rp 2.000.000' },
    { id: 4, name: 'Dress Formal', category: 'Dress', image: '/Foto Produk/IMG_7106.PNG', priceFrom: 'Rp 1.800.000' },
    { id: 5, name: 'Jas Wanita Premium', category: 'Formal Wear', image: '/Foto Produk/IMG_7107.PNG', priceFrom: 'Rp 2.500.000' },
    { id: 6, name: 'One Set Wanita', category: 'Formal Wear', image: '/Foto Produk/IMG_7108.PNG', priceFrom: 'Rp 3.000.000' },
];

export default function WomenCollectionPage() {
    return (
        <>
            <div className="page-hero page-hero--gold">
                <div className="container">
                    <SectionTitle subtitle="Women's Collection" title="Koleksi Wanita" description="Kebaya, dress, batik, jas wanita untuk wanita profesional yang tampil berkelas." light />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="dinas-grid">
                        {products.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="dinas-card">
                                <div className="dinas-card__image">
                                    <img src={product.image} alt={product.name} loading="lazy" />
                                    <div className="dinas-card__badge">Custom</div>
                                    <div className="dinas-card__overlay"><span className="btn btn-white">Lihat Detail</span></div>
                                </div>
                                <div className="dinas-card__info">
                                    <span className="dinas-card__category">{product.category}</span>
                                    <h3 className="dinas-card__name">{product.name}</h3>
                                    <p className="dinas-card__price">Mulai dari {product.priceFrom}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
