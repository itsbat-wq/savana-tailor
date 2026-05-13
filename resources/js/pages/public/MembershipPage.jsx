import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../components/shared/SectionTitle';

export default function MembershipPage() {
    return (
        <>
            <Helmet>
                <title>Membership — Savana Taylor Boutique</title>
                <meta name="description" content="Program membership Regular & Priority dengan benefit eksklusif untuk pelanggan setia." />
            </Helmet>
            <div className="page-hero page-hero--gold">
                <div className="container">
                    <SectionTitle
                        subtitle="Exclusive"
                        title="Membership"
                        description="Bergabung dengan program membership kami untuk benefit dan privilege eksklusif."
                        light
                    />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <p className="text-body" style={{ textAlign: 'center', opacity: 0.6 }}>
                        Halaman membership akan menampilkan tier, benefit, dan form registrasi.
                    </p>
                </div>
            </section>
        </>
    );
}
