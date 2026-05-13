import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Phone, MapPin, Clock } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <h3 className="footer__logo">Savana Taylor</h3>
                        <p className="footer__tagline">Custom Made • Exclusive • Elegant • Timeless</p>
                        <p className="footer__desc">
                            Premium custom tailor dengan pengalaman 10+ tahun melayani profesional Indonesia.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__section">
                        <h4 className="footer__title">Quick Links</h4>
                        <nav className="footer__links">
                            <Link to="/baju-dinas">Baju Dinas</Link>
                            <Link to="/men-collection">Men Collection</Link>
                            <Link to="/women-collection">Women Collection</Link>
                            <Link to="/custom-tailor">Custom Tailor</Link>
                            <Link to="/rental">Rental</Link>
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="footer__section">
                        <h4 className="footer__title">Services</h4>
                        <nav className="footer__links">
                            <Link to="/membership">Membership</Link>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="footer__section">
                        <h4 className="footer__title">Contact</h4>
                        <div className="footer__contact">
                            <div className="footer__contact-item">
                                <MapPin size={16} />
                                <span>Jakarta, Indonesia</span>
                            </div>
                            <div className="footer__contact-item">
                                <Phone size={16} />
                                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                                    +62 812-3456-7890
                                </a>
                            </div>
                            <div className="footer__contact-item">
                                <AtSign size={16} />
                                <a href="https://instagram.com/savanataylor" target="_blank" rel="noopener noreferrer">
                                    @savanataylor
                                </a>
                            </div>
                            <div className="footer__contact-item">
                                <Clock size={16} />
                                <span>Sen - Sab: 09:00 - 18:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Savana Taylor Boutique. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
