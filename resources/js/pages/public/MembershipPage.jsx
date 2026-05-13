import React from 'react';
import SectionTitle from '../../components/shared/SectionTitle';

export default function MembershipPage() {
    return (
        <>
            <div className="page-hero page-hero--gold">
                <div className="container">
                    <SectionTitle subtitle="Exclusive" title="Membership" description="Bergabung dengan program membership kami untuk benefit eksklusif." light />
                </div>
            </div>
            <section className="section">
                <div className="container" style={{textAlign:'center'}}>
                    <p className="text-body" style={{opacity:0.6}}>Halaman membership akan menampilkan tier, benefit, dan form registrasi.</p>
                </div>
            </section>
        </>
    );
}
