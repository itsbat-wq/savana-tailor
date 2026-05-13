import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../../api/public';

const LOGO = '/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png';

function Navbar({ wa }) {
    const [shopOpen, setShopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isActive = (p) => location.pathname === p ? 'navbar__link--active' : '';
    const shopPaths = ['/baju-dinas', '/men-collection', '/women-collection', '/custom-tailor'];

    return (
        <header className="navbar navbar--scrolled">
            <div className="navbar__container container">
                <Link to="/" className="navbar__logo">
                    <img src={LOGO} alt="ST" className="navbar__logo-img" />
                    <span className="navbar__logo-text">Savana Taylor</span>
                </Link>
                <nav className="navbar__nav">
                    <Link to="/" className={`navbar__link ${isActive('/')}`}>Home</Link>
                    <div className="navbar__dropdown" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                        <span className={`navbar__link navbar__link--dropdown ${shopPaths.includes(location.pathname) ? 'navbar__link--active' : ''}`}>
                            Shop <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                        </span>
                        {shopOpen && (
                            <div className="navbar__dropdown-menu">
                                <Link to="/baju-dinas" className="navbar__dropdown-item">Baju Dinas</Link>
                                <Link to="/men-collection" className="navbar__dropdown-item">Men Collection</Link>
                                <Link to="/women-collection" className="navbar__dropdown-item">Women Collection</Link>
                                <Link to="/custom-tailor" className="navbar__dropdown-item">Custom Tailor</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/rental" className={`navbar__link ${isActive('/rental')}`}>Rental</Link>
                    <Link to="/about" className={`navbar__link ${isActive('/about')}`}>About</Link>
                    <Link to="/contact" className={`navbar__link ${isActive('/contact')}`}>Contact</Link>
                </nav>
                <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                    <span/><span/><span/>
                </button>
            </div>
            {mobileOpen && (
                <div className="mobile-nav">
                    <div className="mobile-nav__overlay" onClick={() => setMobileOpen(false)} />
                    <div className="mobile-nav__content">
                        <button className="mobile-nav__close" onClick={() => setMobileOpen(false)}>&times;</button>
                        <nav className="mobile-nav__links">
                            {[['/', 'Home'], ['/baju-dinas', 'Baju Dinas'], ['/men-collection', 'Men Collection'], ['/women-collection', 'Women Collection'], ['/custom-tailor', 'Custom Tailor'], ['/rental', 'Rental'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => (
                                <Link key={path} to={path} className="mobile-nav__link" onClick={() => setMobileOpen(false)}>{label}</Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

function Footer({ settings }) {
    const c = settings?.contact ?? {};
    const wa = c.whatsapp ?? '6281317935360';
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <h3 className="footer__logo">Savana Taylor Boutique</h3>
                        <p className="footer__tagline">Custom Made &bull; Exclusive &bull; Elegant &bull; Timeless</p>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title">Quick Links</h4>
                        <nav className="footer__links">
                            {[['/baju-dinas', 'Baju Dinas'], ['/men-collection', 'Men Collection'], ['/women-collection', 'Women Collection'], ['/custom-tailor', 'Custom Tailor'], ['/rental', 'Rental']].map(([path, label]) => (
                                <Link key={path} to={path}>{label}</Link>
                            ))}
                        </nav>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title">Contact</h4>
                        <div className="footer__contact-icons">
                            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                {c.phone ?? '081317935360'}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom"><p>&copy; {new Date().getFullYear()} Savana Taylor Boutique. All rights reserved.</p></div>
            </div>
        </footer>
    );
}

export default function Layout() {
    const { data: settingsData } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
    const settings = settingsData?.data;
    const wa = settings?.contact?.whatsapp ?? '6281317935360';

    return (
        <div>
            <Navbar wa={wa} />
            <main><Outlet context={{ settings }} /></main>
            <Footer settings={settings} />
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
        </div>
    );
}
