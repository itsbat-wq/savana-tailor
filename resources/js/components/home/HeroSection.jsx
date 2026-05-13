import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
    return (
        <section className="hero">
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
                <div className="hero__logo-badge">
                    <img src="/Logo/IMG_7053.PNG" alt="Savana Taylor" className="hero__logo-img" />
                </div>

                <span className="hero__subtitle">
                    Custom Made • Exclusive • Elegant • Timeless
                </span>

                <h1 className="hero__title heading-xl">
                    Crafting Elegance,<br />
                    <span className="hero__title-accent">Defining Excellence</span>
                </h1>

                <p className="hero__desc">
                    Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring
                    untuk profesional yang menghargai kualitas dan keanggunan.
                </p>

                <div className="hero__actions">
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
                </div>

                <div className="hero__stats">
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
                </div>
            </div>
        </section>
    );
}
