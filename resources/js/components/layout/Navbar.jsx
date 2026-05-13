import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/baju-dinas', label: 'Baju Dinas' },
    { path: '/men-collection', label: 'Men' },
    { path: '/women-collection', label: 'Women' },
    { path: '/custom-tailor', label: 'Custom Tailor' },
    { path: '/rental', label: 'Rental' },
    { path: '/membership', label: 'Membership' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    return (
        <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <Link to="/" className="navbar__logo">
                    <img
                        src="/Logo/IMG_7053.PNG"
                        alt="Savana Taylor Boutique"
                        className="navbar__logo-img"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="navbar__nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                        >
                            {link.label}
                            {location.pathname === link.path && (
                                <motion.span
                                    className="navbar__link-underline"
                                    layoutId="navbar-underline"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="navbar__toggle"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.nav
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to={link.path}
                                    className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
