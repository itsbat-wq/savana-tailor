import React from 'react';
import SectionTitle from '../../components/shared/SectionTitle';

export default function RentalPage() {
    return (
        <>
            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle subtitle="Service" title="Rental" description="Sewa pakaian formal premium untuk acara spesial Anda." light />
                </div>
            </div>
            <section className="section">
                <div className="container" style={{textAlign:'center'}}>
                    <p className="text-body" style={{opacity:0.6}}>Halaman rental akan menampilkan katalog dan opsi sewa.</p>
                </div>
            </section>
        </>
    );
}
