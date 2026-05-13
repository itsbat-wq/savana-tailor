import React from 'react';
import { Award, Scissors, Clock, Shield } from 'lucide-react';
import './USPBadges.css';

const badges = [
    { icon: Scissors, title: 'Custom Made', desc: 'Setiap pakaian dibuat khusus sesuai ukuran dan preferensi Anda' },
    { icon: Award, title: 'Premium Quality', desc: 'Bahan berkualitas tinggi dari supplier terpercaya' },
    { icon: Clock, title: 'Tepat Waktu', desc: 'Komitmen pengerjaan sesuai jadwal yang disepakati' },
    { icon: Shield, title: 'Garansi Fitting', desc: 'Garansi penyesuaian hingga pakaian pas sempurna' },
];

export default function USPBadges() {
    return (
        <section className="usp section">
            <div className="container">
                <div className="usp__grid">
                    {badges.map((badge, index) => (
                        <div key={index} className="usp__card">
                            <div className="usp__icon">
                                <badge.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="usp__title">{badge.title}</h3>
                            <p className="usp__desc">{badge.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
