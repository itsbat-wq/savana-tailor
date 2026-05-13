import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/shared/SectionTitle';

export default function RentalPage() {
    return (
        <>
            <Helmet>
                <title>Rental — Savana Taylor Boutique</title>
                <meta name="description" content="Layanan rental pakaian formal premium untuk pria dan wanita. Full set atau opsional." />
            </Helmet>
            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle
                        subtitle="Service"
                        title="Rental"
                        description="Sewa pakaian formal premium untuk acara spesial Anda."
                        light
                    />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <p className="text-body" style={{ textAlign: 'center', opacity: 0.6 }}>
                        Halaman rental akan menampilkan katalog dan opsi sewa.
                    </p>
                </div>
            </section>
        </>
    );
}
