import React from 'react';
import { MessageSquare, Palette, Ruler, Package } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import './ProcessSection.css';

const steps = [
    { icon: MessageSquare, number: '01', title: 'Konsultasi', desc: 'Diskusikan kebutuhan dan preferensi Anda dengan tim kami' },
    { icon: Palette, number: '02', title: 'Pilih Bahan', desc: 'Pilih dari koleksi bahan premium berkualitas tinggi' },
    { icon: Ruler, number: '03', title: 'Pengukuran', desc: 'Pengukuran presisi untuk hasil fitting sempurna' },
    { icon: Package, number: '04', title: 'Produksi & Delivery', desc: 'Pengerjaan oleh craftsman berpengalaman, diantar ke Anda' },
];

export default function ProcessSection() {
    return (
        <section className="process section">
            <div className="container">
                <SectionTitle subtitle="How It Works" title="Proses Custom Kami" description="Empat langkah mudah untuk mendapatkan pakaian custom impian Anda." light />
                <div className="process__steps">
                    {steps.map((step, index) => (
                        <div key={index} className="process__step">
                            <div className="process__step-number">{step.number}</div>
                            <div className="process__step-icon">
                                <step.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="process__step-title">{step.title}</h3>
                            <p className="process__step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
