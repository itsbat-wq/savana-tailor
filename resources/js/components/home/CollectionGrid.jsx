import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import './CollectionGrid.css';

const collections = [
    { title: 'Baju Dinas', desc: 'PDL, PDH, PDU, PIDSUS, PIDUM & lainnya', path: '/baju-dinas', image: '/Foto Produk/IMG_6943.PNG', accent: 'maroon' },
    { title: 'Men Collection', desc: 'Formal wear, jas, kemeja premium', path: '/men-collection', image: '/Foto Produk/IMG_6942.PNG', accent: 'black' },
    { title: 'Women Collection', desc: 'Kebaya, dress, batik, jas wanita', path: '/women-collection', image: '/Foto Produk/PDUK Jaksa Perempuan.PNG', accent: 'gold' },
    { title: 'Custom Tailor', desc: 'Buat pakaian impian Anda', path: '/custom-tailor', image: '/Foto Produk/IMG_7021.PNG', accent: 'maroon' },
    { title: 'Rental', desc: 'Sewa pakaian formal premium', path: '/rental', image: '/Foto Produk/IMG_7037.PNG', accent: 'black' },
    { title: 'Membership', desc: 'Bergabung untuk benefit eksklusif', path: '/membership', image: '/Foto Produk/IMG_7058.PNG', accent: 'gold' },
];

export default function CollectionGrid() {
    return (
        <section className="collection section">
            <div className="container">
                <SectionTitle
                    subtitle="Our Collections"
                    title="Explore Our Services"
                    description="Dari baju dinas resmi hingga formal wear premium, kami menyediakan solusi lengkap untuk kebutuhan pakaian profesional Anda."
                />
                <div className="collection__grid">
                    {collections.map((item, index) => (
                        <Link key={index} to={item.path} className={`collection__card collection__card--${item.accent}`}>
                            <div className="collection__card-bg">
                                <img src={item.image} alt={item.title} className="collection__card-bg-img" loading="lazy" />
                            </div>
                            <div className="collection__card-content">
                                <h3 className="collection__card-title">{item.title}</h3>
                                <p className="collection__card-desc">{item.desc}</p>
                                <span className="collection__card-link">
                                    Explore <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
