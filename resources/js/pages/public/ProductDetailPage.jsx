import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
    const { slug } = useParams();

    return (
        <>
            <Helmet>
                <title>Product Detail — Savana Taylor Boutique</title>
            </Helmet>
            <section className="section" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <p className="text-body" style={{ textAlign: 'center', opacity: 0.6 }}>
                        Detail produk: <strong>{slug}</strong><br />
                        Halaman ini akan menampilkan detail produk setelah backend API tersedia.
                    </p>
                </div>
            </section>
        </>
    );
}
