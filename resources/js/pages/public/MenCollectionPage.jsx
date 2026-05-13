import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';

const products = [
    { id: 1, name: 'PDUK Pimpinan', category: 'Baju Dinas', image: '/Foto Produk/Man paling atas PDUK PIMPINAN.PNG', priceFrom: 'Rp 2.500.000' },
    { id: 2, name: 'PDU Kejaksaan', category: 'Baju Dinas', image: '/Foto Produk/PDU Man_ taro juga di jejeran utama paling atas setengah pduk dan pdub man tadi.PNG', priceFrom: 'Rp 2.000.000' },
    { id: 3, name: 'Baju Dinas Lapangan', category: 'PDL', image: '/Foto Produk/Baju Dinas Lapagan.PNG', priceFrom: 'Rp 1.500.000' },
    { id: 4, name: 'Kemeja Formal', category: 'Formal Wear', image: '/Foto Produk/Kemeja.PNG', priceFrom: 'Rp 800.000' },
    { id: 5, name: 'Jas Formal Premium', category: 'Formal Wear', image: '/Foto Produk/IMG_6942.PNG', priceFrom: 'Rp 2.800.000' },
    { id: 6, name: 'One Set Formal', category: 'Formal Wear', image: '/Foto Produk/IMG_6943.PNG', priceFrom: 'Rp 3.500.000' },
];

export default function MenCollectionPage() {
    return (
        <>
            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle subtitle="Men's Collection" title="Koleksi Pria" description="Baju dinas, formal wear, dan custom tailoring premium untuk pria profesional." light />
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
