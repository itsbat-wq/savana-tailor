import React from 'react';
import { motion } from 'framer-motion';
import { Award, Scissors, Clock, Shield } from 'lucide-react';
import './USPBadges.css';

const badges = [
    {
        icon: Scissors,
        title: 'Custom Made',
        desc: 'Setiap pakaian dibuat khusus sesuai ukuran dan preferensi Anda',
    },
    {
        icon: Award,
        title: 'Premium Quality',
        desc: 'Bahan berkualitas tinggi dari supplier terpercaya',
    },
    {
        icon: Clock,
        title: 'Tepat Waktu',
        desc: 'Komitmen pengerjaan sesuai jadwal yang disepakati',
    },
    {
        icon: Shield,
        title: 'Garansi Fitting',
        desc: 'Garansi penyesuaian hingga pakaian pas sempurna',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function USPBadges() {
    return (
        <section className="usp section">
            <div className="container">
                <motion.div
                    className="usp__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            className="usp__card"
                            variants={itemVariants}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="usp__icon">
                                <badge.icon size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="usp__title">{badge.title}</h3>
                            <p className="usp__desc">{badge.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
