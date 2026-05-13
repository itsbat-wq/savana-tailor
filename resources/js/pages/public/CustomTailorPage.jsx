import React from 'react';
import { MessageSquare, Palette, Ruler, Package, ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import './CustomTailorPage.css';

const steps = [
    { icon: MessageSquare, number: '01', title: 'Konsultasi', desc: 'Hubungi kami via WhatsApp untuk diskusikan kebutuhan Anda. Konsultasi awal gratis.' },
    { icon: Palette, number: '02', title: 'Pilih Bahan', desc: 'Pilih dari koleksi bahan premium kami dari supplier terpercaya.' },
    { icon: Ruler, number: '03', title: 'Pengukuran', desc: 'Tim kami melakukan pengukuran presisi. By appointment.' },
    { icon: Package, number: '04', title: 'Produksi & Delivery', desc: 'Pengerjaan oleh craftsman 10+ tahun. Fitting review sebelum finishing.' },
];

export default function CustomTailorPage() {
    return (
        <>
            <div className="page-hero page-hero--maroon">
                <div className="container">
                    <SectionTitle subtitle="Our Process" title="Custom Tailor" description="Buat pakaian impian Anda dengan proses yang mudah dan hasil yang sempurna." light />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="custom-steps">
                        {steps.map((step, index) => (
                            <div key={index} className="custom-step">
                                <div className="custom-step__number">{step.number}</div>
                                <div className="custom-step__icon"><step.icon size={28} strokeWidth={1.5} /></div>
                                <div className="custom-step__content">
                                    <h3 className="custom-step__title">{step.title}</h3>
                                    <p className="custom-step__desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="custom-cta">
                        <h2 className="heading-md">Siap Mulai?</h2>
                        <div className="gold-divider gold-divider-center" />
                        <p>Hubungi kami sekarang untuk konsultasi gratis.</p>
                        <div className="custom-cta__actions">
                            <a href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20custom%20tailor" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Chat WhatsApp <ArrowRight size={16} /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
