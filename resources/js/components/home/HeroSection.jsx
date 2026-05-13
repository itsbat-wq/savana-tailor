import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
    return (
        <section className="hero">
            {/* Background image */}
            <div className="hero__bg">
                <img
                    src="/Foto Produk/IMG_7054.PNG"
                    alt="Savana Taylor Boutique"
                    className="hero__bg-img"
                />
            </div>
            <div className="hero__overlay" />
            <div className="hero__particles" />

            <div className="hero__content container">
                <motion.div
                    className="hero__logo-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img src="/Logo/IMG_7053.PNG" alt="Savana Taylor" className="hero__logo-img" />
                </motion.div>

                <motion.span
                    className="hero__subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Custom Made • Exclusive • Elegant • Timeless
                </motion.span>

                <motion.h1
                    className="hero__title heading-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Crafting Elegance,<br />
                    <span className="hero__title-accent">Defining Excellence</span>
                </motion.h1>

                <motion.p
                    className="hero__desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring
                    untuk profesional yang menghargai kualitas dan keanggunan.
                </motion.p>

                <motion.div
                    className="hero__actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                >
                    <a
                        href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20book%20appointment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Book Appointment
                        <ArrowRight size={16} />
                    </a>
                    <Link to="/baju-dinas" className="btn btn-secondary">
                        Explore Collection
                    </Link>
                </motion.div>

                <motion.div
                    className="hero__stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    <div className="hero__stat">
                        <span className="hero__stat-number">10+</span>
                        <span className="hero__stat-label">Tahun Pengalaman</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-number">5000+</span>
                        <span className="hero__stat-label">Klien Puas</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-number">100%</span>
                        <span className="hero__stat-label">Custom Made</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero__scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.div
                    className="hero__scroll-line"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    );
}
