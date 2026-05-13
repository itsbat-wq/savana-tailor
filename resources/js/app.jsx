import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const B = { phone: '081317935360', wa: '6281317935360', ig: '@savanatailorboutique', tt: '@savanatailorboutique', loc: 'Jakarta Utara' };
const LOGO = '/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png';

// ===== PLACEHOLDER PRODUCTS (no real images) =====
const CATALOG = {
    dinas: [
        { id: 'd1', name: 'PDUK Pimpinan', category: 'PDU', price: 'Rp 2.500.000' },
        { id: 'd2', name: 'PDU Kejaksaan Pria', category: 'PDU', price: 'Rp 2.000.000' },
        { id: 'd3', name: 'PDUK Jaksa Perempuan', category: 'PDU', price: 'Rp 2.200.000' },
        { id: 'd4', name: 'PDUB Jaksa Perempuan', category: 'PDU', price: 'Rp 2.000.000' },
        { id: 'd5', name: 'Baju Dinas Lapangan (PDL)', category: 'PDL', price: 'Rp 1.500.000' },
        { id: 'd6', name: 'Kemeja Dinas (PDH)', category: 'PDH', price: 'Rp 800.000' },
    ],
    men: [
        { id: 'm1', name: 'Jas Formal Custom', category: 'Jas', price: 'Rp 2.800.000' },
        { id: 'm2', name: 'Kemeja Formal', category: 'Kemeja', price: 'Rp 800.000' },
        { id: 'm3', name: 'One Set Formal', category: 'One Set', price: 'Rp 3.500.000' },
        { id: 'm4', name: 'Celana Formal', category: 'Celana', price: 'Rp 600.000' },
        { id: 'm5', name: 'Tactical Uniform', category: 'Baju Dinas', price: 'Rp 1.500.000' },
    ],
    women: [
        { id: 'w1', name: 'Blazer Wanita', category: 'Blazer', price: 'Rp 2.500.000' },
        { id: 'w2', name: 'Jas Wanita Custom', category: 'Jas', price: 'Rp 2.800.000' },
        { id: 'w3', name: 'Kebaya Modern', category: 'Kebaya', price: 'Rp 2.000.000' },
        { id: 'w4', name: 'Dress Formal', category: 'Dress', price: 'Rp 1.800.000' },
        { id: 'w5', name: 'Women Professional Set', category: 'One Set', price: 'Rp 3.000.000' },
        { id: 'w6', name: 'Rok & Celana Formal', category: 'Formal', price: 'Rp 700.000' },
    ],
    custom: [
        { id: 'c1', name: 'Custom Jas Premium', category: 'Custom', price: 'Mulai Rp 2.500.000' },
        { id: 'c2', name: 'Custom Baju Dinas', category: 'Custom', price: 'Mulai Rp 1.500.000' },
        { id: 'c3', name: 'Custom Kebaya', category: 'Custom', price: 'Mulai Rp 2.000.000' },
    ],
};
const ALL_PRODUCTS = [...CATALOG.dinas, ...CATALOG.men, ...CATALOG.women, ...CATALOG.custom];

// ===== ANIMATION VARIANTS =====
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleOnHover = { scale: 1.03, transition: { duration: 0.3 } };

// ===== SKELETON LOADER =====
function SkeletonCard() {
    return (
        <div className="skeleton skeleton-card">
            <div className="skeleton skeleton-card__image"></div>
            <div className="skeleton skeleton-card__info">
                <div className="skeleton skeleton-line skeleton-line--short"></div>
                <div className="skeleton skeleton-line skeleton-line--medium"></div>
                <div className="skeleton skeleton-line skeleton-line--short"></div>
            </div>
        </div>
    );
}

function SkeletonGrid({ count = 6 }) {
    return (
        <div className="dinas-grid">
            {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
    );
}

// ===== COMPONENTS =====
function Navbar() {
    const [shopOpen, setShopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isActive = (p) => location.pathname === p ? 'navbar__link--active' : '';

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

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
                        <span className={`navbar__link navbar__link--dropdown ${['/baju-dinas','/men-collection','/women-collection','/custom-tailor'].includes(location.pathname) ? 'navbar__link--active' : ''}`}>Shop <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg></span>
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
                {/* Mobile hamburger toggle */}
                <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
            {/* Mobile nav overlay */}
            {mobileOpen && (
                <div className="mobile-nav">
                    <div className="mobile-nav__overlay" onClick={() => setMobileOpen(false)} />
                    <div className="mobile-nav__content">
                        <button className="mobile-nav__close" onClick={() => setMobileOpen(false)} aria-label="Close menu">&times;</button>
                        <nav className="mobile-nav__links">
                            <Link to="/" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Home</Link>
                            <Link to="/baju-dinas" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Baju Dinas</Link>
                            <Link to="/men-collection" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Men Collection</Link>
                            <Link to="/women-collection" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Women Collection</Link>
                            <Link to="/custom-tailor" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Custom Tailor</Link>
                            <Link to="/rental" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Rental</Link>
                            <Link to="/about" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>About</Link>
                            <Link to="/contact" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Contact</Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

function Footer() {
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
                            <Link to="/baju-dinas">Baju Dinas</Link>
                            <Link to="/men-collection">Men Collection</Link>
                            <Link to="/women-collection">Women Collection</Link>
                            <Link to="/custom-tailor">Custom Tailor</Link>
                            <Link to="/rental">Rental</Link>
                        </nav>
                    </div>
                    <div className="footer__section">
                        <h4 className="footer__title">Contact</h4>
                        <div className="footer__contact-icons">
                            <a href={`https://wa.me/${B.wa}`} target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> {B.phone}</a>
                            <a href="https://instagram.com/savanatailorboutique" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg> {B.ig}</a>
                            <a href="https://tiktok.com/@savanatailorboutique" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> {B.tt}</a>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom"><p>&copy; {new Date().getFullYear()} Savana Taylor Boutique. All rights reserved.</p></div>
            </div>
        </footer>
    );
}

function ProductCard({ product }) {
    return (
        <motion.div variants={fadeInUp} whileHover={scaleOnHover}>
            <Link to={`/product/${product.id}`} className="dinas-card">
                <div className="dinas-card__image"><div className="dinas-card__placeholder">Foto Produk</div></div>
                <div className="dinas-card__info">
                    <span className="dinas-card__category">{product.category}</span>
                    <h3 className="dinas-card__name">{product.name}</h3>
                    <p className="dinas-card__price">{product.price}</p>
                </div>
            </Link>
        </motion.div>
    );
}

function CatalogPage({ title, subtitle, products, filters }) {
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [priceSort, setPriceSort] = useState('none');
    const [loading, setLoading] = useState(true);
    const cats = filters || [...new Set(products.map(p => p.category))];
    let filtered = activeFilter === 'all' ? products : products.filter(p => p.category === activeFilter);
    if (priceSort === 'low') filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,'')));
    if (priceSort === 'high') filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,'')));

    useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 0); return () => clearTimeout(t); }, [activeFilter, priceSort]);

    return (
        <div>
            <motion.div className="page-hero page-hero--maroon" initial="hidden" animate="visible" variants={fadeIn}>
                <div className="container"><div className="section-title section-title--center section-title--light"><span className="section-title__subtitle">{subtitle}</span><h1 className="section-title__heading heading-lg">{title}</h1><div className="gold-divider gold-divider-center" /></div></div>
            </motion.div>
            <section className="section"><div className="container">
                <div className="catalog-filters">
                    <div className="catalog-filters__row">
                        <div className="catalog-filter-dropdown">
                            <button className="catalog-filter-dropdown__trigger" onClick={() => setFilterOpen(!filterOpen)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                                <span>{activeFilter === 'all' ? 'Kategori' : activeFilter}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                            </button>
                            {filterOpen && (
                                <div className="catalog-filter-dropdown__menu">
                                    <button className={`catalog-filter-dropdown__item ${activeFilter === 'all' ? 'catalog-filter-dropdown__item--active' : ''}`} onClick={() => { setActiveFilter('all'); setFilterOpen(false); }}>Semua</button>
                                    {cats.map(c => <button key={c} className={`catalog-filter-dropdown__item ${activeFilter === c ? 'catalog-filter-dropdown__item--active' : ''}`} onClick={() => { setActiveFilter(c); setFilterOpen(false); }}>{c}</button>)}
                                </div>
                            )}
                        </div>
                        <div className="catalog-filter-dropdown">
                            <select className="catalog-filter-dropdown__select" value={priceSort} onChange={e => setPriceSort(e.target.value)}>
                                <option value="none">Harga</option>
                                <option value="low">Termurah</option>
                                <option value="high">Termahal</option>
                            </select>
                        </div>
                    </div>
                    {activeFilter !== 'all' && <div className="catalog-filters__active"><span>Filter: <strong>{activeFilter}</strong></span><button onClick={() => setActiveFilter('all')}>&times; Reset</button></div>}
                </div>
                {loading ? <SkeletonGrid count={6} /> : (
                    <motion.div className="dinas-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                    </motion.div>
                )}
                {!loading && filtered.length === 0 && <p style={{textAlign:'center',padding:'40px',opacity:0.5}}>Tidak ada produk untuk filter ini.</p>}
            </div></section>
        </div>
    );
}

// ===== PAGES =====
function HomePage() {
    useEffect(() => { document.title = 'Savana Taylor Boutique - Premium Tailor Jakarta'; }, []);
    return (
        <div>
            <section className="hero">
                <div className="hero__bg"><img src="/Foto Produk/IMG_7054.PNG" alt="" className="hero__bg-img" /></div>
                <div className="hero__overlay" />
                <motion.div className="hero__content container" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
                    <span className="hero__subtitle">Custom Made &bull; Exclusive &bull; Elegant &bull; Timeless</span>
                    <h1 className="hero__title heading-xl">Crafting Elegance,<br /><span className="hero__title-accent">Defining Excellence</span></h1>
                    <p className="hero__desc">Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring untuk profesional yang menghargai kualitas dan keanggunan.</p>
                    <div className="hero__actions">
                        <a href={`https://wa.me/${B.wa}?text=${encodeURIComponent('Halo Savana Taylor, saya ingin book appointment')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Appointment</a>
                        <Link to="/baju-dinas" className="btn btn-secondary">Explore Collection</Link>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat"><span className="hero__stat-number">10+</span><span className="hero__stat-label">Tahun Pengalaman</span></div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat"><span className="hero__stat-number">30+</span><span className="hero__stat-label">Kota Dilayani</span></div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat"><span className="hero__stat-number">100%</span><span className="hero__stat-label">Custom Made</span></div>
                    </div>
                </motion.div>
            </section>
            <motion.section className="usp section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                <div className="container"><div className="usp__grid">
                    {[['Cutting modern & sleek','Desain modern dengan potongan presisi'],['Nyaman dipakai','Bahan premium yang breathable dan nyaman'],['Bisa custom ukuran','Setiap pakaian dibuat sesuai ukuran Anda'],['Tampil profesional & percaya diri','Tingkatkan kepercayaan diri Anda']].map(([t,d],i) => (
                        <motion.div key={i} className="usp__card" variants={fadeInUp}>
                            <h3 className="usp__title">{t}</h3><p className="usp__desc">{d}</p>
                        </motion.div>
                    ))}
                </div></div>
            </motion.section>
            <motion.section className="bestseller section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <div className="container">
                    <div className="section-title section-title--center"><span className="section-title__subtitle">Best Sellers</span><h2 className="section-title__heading heading-lg">Produk Terpopuler</h2><div className="gold-divider gold-divider-center" /></div>
                    <motion.div className="bestseller__grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {CATALOG.dinas.slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
                    </motion.div>
                    <div className="bestseller__cta"><Link to="/baju-dinas" className="btn btn-primary">Lihat Semua Produk</Link></div>
                </div>
            </motion.section>
            <motion.section className="cta section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
                <div className="container"><div className="cta__card"><div className="cta__content">
                    <h2 className="cta__title heading-md">Siap Untuk Tampil <span className="text-gold">Lebih Berkelas?</span></h2>
                    <p className="cta__desc">Book appointment sekarang. Konsultasi gratis. Pertemuan harus dengan janji terlebih dahulu.</p>
                    <a href={`https://wa.me/${B.wa}`} target="_blank" rel="noopener noreferrer" className="btn btn-white">Chat WhatsApp</a>
                </div></div></div>
            </motion.section>
        </div>
    );
}

function ProductDetailPage() {
    const { slug } = useParams();
    const product = ALL_PRODUCTS.find(p => p.id === slug) || { name: 'Produk', category: 'Kategori', price: 'Hubungi kami' };
    const waText = encodeURIComponent(`Halo Savana Taylor, saya tertarik dengan produk: ${product.name} (${product.category}) - ${product.price}. Mohon info lebih lanjut.`);

    useEffect(() => { document.title = `${product.name} - Savana Taylor Boutique`; }, [product.name]);

    // Related products: 4 random products excluding current
    const relatedProducts = ALL_PRODUCTS.filter(p => p.id !== slug).sort(() => Math.random() - 0.5).slice(0, 4);

    return (
        <div>
            <div style={{paddingTop:'100px'}} className="section"><div className="container">
                <motion.div className="product-detail" initial="hidden" animate="visible" variants={fadeInUp}>
                    <div className="product-detail__image"><div className="dinas-card__placeholder" style={{height:'400px'}}>Foto Produk</div></div>
                    <div className="product-detail__info">
                        <span className="dinas-card__category">{product.category}</span>
                        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'2rem',margin:'8px 0 16px'}}>{product.name}</h1>
                        <p style={{fontSize:'1.5rem',color:'var(--color-maroon)',fontWeight:700,marginBottom:'24px'}}>{product.price}</p>
                        <div className="gold-divider" />
                        <ul style={{margin:'20px 0',fontSize:'0.9rem',color:'rgba(17,17,17,0.7)',lineHeight:2}}>
                            <li>&#10003; Cutting modern & sleek</li>
                            <li>&#10003; Nyaman dipakai</li>
                            <li>&#10003; Bisa custom ukuran</li>
                            <li>&#10003; Tampil profesional & percaya diri</li>
                        </ul>
                        <a href={`https://wa.me/${B.wa}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%',marginTop:'20px'}}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                            Pesan via WhatsApp
                        </a>
                        <p style={{fontSize:'0.75rem',color:'rgba(17,17,17,0.5)',marginTop:'12px',textAlign:'center'}}>* Anda akan diarahkan ke WhatsApp untuk konsultasi & pemesanan</p>
                    </div>
                </motion.div>
            </div></div>
            {/* Related Products */}
            <motion.section className="section" style={{background:'var(--color-cream)'}} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}>
                <div className="container">
                    <div className="section-title section-title--center"><span className="section-title__subtitle">Rekomendasi</span><h2 className="section-title__heading heading-lg">Produk Lainnya</h2><div className="gold-divider gold-divider-center" /></div>
                    <motion.div className="bestseller__grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}

function AboutPage() {
    const [section, setSection] = useState('identity');
    const sections = { identity: 'About Us', visi: 'Visi & Misi', excellence: 'Keunggulan', achievement: 'Achievement', positioning: 'Positioning' };

    useEffect(() => { document.title = 'About Us - Savana Taylor Boutique'; }, []);

    return (
        <div>
            <motion.div className="page-hero page-hero--maroon" initial="hidden" animate="visible" variants={fadeIn}>
                <div className="container"><div className="section-title section-title--center section-title--light"><span className="section-title__subtitle">Our Story</span><h1 className="section-title__heading heading-lg">About Us</h1><div className="gold-divider gold-divider-center" /></div></div>
            </motion.div>
            <section className="section"><div className="container"><div className="about-layout">
                <aside className="about-sidebar">
                    {Object.entries(sections).map(([key, label]) => (
                        <button key={key} className={`about-sidebar__btn ${section === key ? 'about-sidebar__btn--active' : ''}`} onClick={() => setSection(key)}>{label}</button>
                    ))}
                </aside>
                <motion.div className="about-content" initial="hidden" animate="visible" variants={fadeInUp} key={section}>
                    {section === 'identity' && (<div><h2 className="heading-sm">Siapa Kami</h2><div className="gold-divider" /><p>Savana Taylor Boutique adalah premium tailor boutique yang bergerak di bidang custom formal wear dan professional uniform untuk pria dan wanita. Selama kurang lebih 10 tahun, kami telah melayani berbagai kebutuhan pakaian formal dengan konsep eksklusif, elegan, dan profesional.</p><h3 style={{marginTop:'24px',fontSize:'1rem',color:'var(--color-maroon)'}}>Poin Utama</h3><ul><li>Premium tailor & formal wear boutique</li><li>Berdiri dan berkembang selama &plusmn;10 tahun</li><li>Fokus pada custom made formal wear</li><li>Konsep: Exclusive, Elegant, Timeless, Authoritative</li></ul><h3 style={{marginTop:'24px',fontSize:'1rem',color:'var(--color-maroon)'}}>Target Market</h3><ul><li>Kejaksaan</li><li>Pengacara</li><li>Profesional formal</li><li>Official uniform & corporate client</li></ul></div>)}
                    {section === 'visi' && (<div><h2 className="heading-sm">Visi</h2><div className="gold-divider" /><p>Menjadi boutique tailor profesional terpercaya di Indonesia dalam bidang formal wear premium dan custom uniform.</p><h2 className="heading-sm" style={{marginTop:'30px'}}>Misi</h2><div className="gold-divider" /><ul><li>Menghadirkan produk berkualitas tinggi</li><li>Memberikan pelayanan profesional dan personal</li><li>Menjaga detail dan kualitas setiap produk</li><li>Membantu client tampil lebih percaya diri dan elegan</li></ul></div>)}
                    {section === 'excellence' && (<div><h2 className="heading-sm">Keunggulan Kami</h2><div className="gold-divider" /><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Personalized Custom Tailoring</h3><ul><li>Menyesuaikan ukuran & kebutuhan client</li><li>Lebih presisi dan nyaman</li></ul><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Premium Quality Materials</h3><ul><li>Tactical premium</li><li>Wool & semi wool</li><li>Detail finishing rapi</li></ul><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Personalized Professional Service</h3><ul><li>Sistem by appointment</li><li>Pelayanan lebih fokus & eksklusif</li><li>Mengutamakan kualitas, eksklusivitas, kenyamanan client</li></ul></div>)}
                    {section === 'achievement' && (<div><h2 className="heading-sm">Achievement & Portfolio</h2><div className="gold-divider" /><p>Selama lebih dari 10 tahun, kami telah membangun kepercayaan dengan berbagai client profesional dan instansi formal di Indonesia.</p><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Wilayah Dilayani</h3><p>Aceh, Bangka Belitung, Sumatra, Riau, Palembang, Jawa, Bogor, Bandung, Depok, Kalimantan, Sulawesi, Bali, Medan, dan berbagai wilayah lainnya.</p><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Dipercaya Untuk</h3><ul><li>Custom formal wear</li><li>Tactical uniform</li><li>Official attire</li><li>Premium tailoring service</li></ul></div>)}
                    {section === 'positioning' && (<div><h2 className="heading-sm">Market Positioning</h2><div className="gold-divider" /><p>Savana Taylor Boutique berada pada kategori premium tailor boutique yang mengutamakan kualitas bahan, detail pengerjaan, kenyamanan, dan pelayanan personal.</p><h3 style={{marginTop:'20px',fontSize:'1rem',color:'var(--color-maroon)'}}>Value Proposition</h3><ul><li>Custom formal wear premium</li><li>Exclusive & personalized service</li><li>Detail presisi dan kualitas premium</li><li>Professional appearance & confidence</li><li>Elegant and timeless design</li></ul><p style={{marginTop:'20px',fontStyle:'italic',color:'var(--color-gold)'}}>"Exclusive tailor experience for professionals who value quality, precision, and identity."</p></div>)}
                </motion.div>
            </div></div></section>
        </div>
    );
}

function ContactPage() {
    useEffect(() => { document.title = 'Contact - Savana Taylor Boutique'; }, []);
    return (
        <div>
            <motion.div className="page-hero page-hero--black" initial="hidden" animate="visible" variants={fadeIn}>
                <div className="container"><div className="section-title section-title--center section-title--light"><span className="section-title__subtitle">Get In Touch</span><h1 className="section-title__heading heading-lg">Hubungi Kami</h1><div className="gold-divider gold-divider-center" /></div></div>
            </motion.div>
            <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="container"><div className="contact-grid">
                    <div className="contact-info">
                        <div className="contact-info__card"><h4 className="contact-info__title">WhatsApp</h4><p className="contact-info__text"><a href={`https://wa.me/${B.wa}`} target="_blank" rel="noopener noreferrer">{B.phone}</a></p></div>
                        <div className="contact-info__card"><h4 className="contact-info__title">Instagram</h4><p className="contact-info__text"><a href="https://instagram.com/savanatailorboutique" target="_blank" rel="noopener noreferrer">{B.ig}</a></p></div>
                        <div className="contact-info__card"><h4 className="contact-info__title">TikTok</h4><p className="contact-info__text"><a href="https://tiktok.com/@savanatailorboutique" target="_blank" rel="noopener noreferrer">{B.tt}</a></p></div>
                        <div className="contact-info__card"><h4 className="contact-info__title">Lokasi</h4><p className="contact-info__text">{B.loc}</p></div>
                        <div className="contact-info__card"><h4 className="contact-info__title">Jam Operasional</h4><p className="contact-info__text">By Appointment Only</p><p className="contact-info__text" style={{color:'var(--color-gold)',marginTop:'4px'}}>Pertemuan harus dengan janji terlebih dahulu</p></div>
                    </div>
                    <div className="contact-cta-card">
                        <h3 className="heading-sm">Book Appointment</h3><div className="gold-divider" />
                        <p>Hubungi kami via WhatsApp untuk konsultasi dan pengukuran.</p>
                        <div className="contact-cta-card__note"><strong>Penting:</strong> Walk-in tidak dilayani.</div>
                        <a href={`https://wa.me/${B.wa}?text=${encodeURIComponent('Halo Savana Taylor, saya ingin book appointment')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%'}}>Book via WhatsApp</a>
                    </div>
                </div></div>
            </motion.section>
        </div>
    );
}

function RentalPage() {
    useEffect(() => { document.title = 'Rental - Savana Taylor Boutique'; }, []);
    return (<div><motion.div className="page-hero page-hero--black" initial="hidden" animate="visible" variants={fadeIn}><div className="container"><div className="section-title section-title--center section-title--light"><span className="section-title__subtitle">Service</span><h1 className="section-title__heading heading-lg">Rental</h1><div className="gold-divider gold-divider-center" /><p className="section-title__desc">Sewa pakaian formal premium untuk acara spesial. Full set atau opsional.</p></div></div></motion.div><section className="section"><div className="container" style={{textAlign:'center'}}><p style={{opacity:0.6}}>Halaman rental sedang dalam pengembangan. Hubungi kami via WhatsApp untuk info rental.</p><a href={`https://wa.me/${B.wa}?text=${encodeURIComponent('Halo Savana Taylor, saya ingin bertanya tentang rental')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{marginTop:'20px'}}>Chat WhatsApp</a></div></section></div>);
}

// ===== ADMIN DASHBOARD =====
function AdminDashboard() {
    const [page, setPage] = useState('dashboard');
    const [products, setProducts] = useState(ALL_PRODUCTS.map((p,i) => ({...p, image: '', description: 'Deskripsi produk', status: 'active', order: i})));
    const [siteSettings, setSiteSettings] = useState({ heroTitle: 'Crafting Elegance, Defining Excellence', heroDesc: 'Spesialis baju dinas kejaksaan, formal wear premium, dan custom tailoring untuk profesional yang menghargai kualitas dan keanggunan.', phone: B.phone, whatsapp: B.wa, instagram: B.ig, tiktok: B.tt, location: B.loc, aboutText: 'Savana Taylor Boutique adalah premium tailor boutique...', });
    const [editProduct, setEditProduct] = useState(null);
    const [editSettings, setEditSettings] = useState(false);
    const [dragPreview, setDragPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => { document.title = 'Admin Dashboard - Savana Taylor'; }, []);

    const menu = [
        { key: 'dashboard', label: 'Dashboard' },
        { key: 'products', label: 'Products' },
        { key: 'categories', label: 'Categories' },
        { key: 'content', label: 'Content' },
        { key: 'settings', label: 'Settings' },
    ];

    // Reorder functions
    const moveProduct = (index, direction) => {
        const newProducts = [...products];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newProducts.length) return;
        [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
        newProducts.forEach((p, i) => p.order = i);
        setProducts(newProducts);
    };

    // Drag & drop image handler
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            setDragPreview(url);
            if (editProduct) setEditProduct({...editProduct, image: url});
        }
    };
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => { setIsDragging(false); };

    return (
        <div className="admin">
            <aside className="admin__sidebar">
                <div className="admin__sidebar-header">
                    <h2 className="admin__sidebar-title">Admin Panel</h2>
                    <p className="admin__sidebar-sub">Savana Taylor</p>
                </div>
                <nav className="admin__sidebar-nav">
                    {menu.map(m => (
                        <button key={m.key} className={`admin__sidebar-btn ${page === m.key ? 'admin__sidebar-btn--active' : ''}`} onClick={() => { setPage(m.key); setEditProduct(null); setEditSettings(false); setDragPreview(null); }}>{m.label}</button>
                    ))}
                </nav>
                <div className="admin__sidebar-footer">
                    <Link to="/" className="admin__sidebar-btn">&#8592; Back to Site</Link>
                </div>
            </aside>
            <main className="admin__main">
                {page === 'dashboard' && (
                    <div>
                        <h1 className="admin__page-title">Dashboard</h1>
                        <div className="admin__stats">
                            <div className="admin__stat-card"><span className="admin__stat-num">{products.length}</span><span className="admin__stat-label">Total Produk</span></div>
                            <div className="admin__stat-card"><span className="admin__stat-num">{products.filter(p=>p.status==='active').length}</span><span className="admin__stat-label">Produk Aktif</span></div>
                            <div className="admin__stat-card"><span className="admin__stat-num">4</span><span className="admin__stat-label">Kategori</span></div>
                            <div className="admin__stat-card"><span className="admin__stat-num">-</span><span className="admin__stat-label">Pengunjung</span></div>
                        </div>
                        <div className="admin__card" style={{marginTop:'30px'}}>
                            <h3>Quick Actions</h3>
                            <div style={{display:'flex',gap:'12px',marginTop:'16px',flexWrap:'wrap'}}>
                                <button className="btn btn-primary" onClick={() => { setPage('products'); setEditProduct({id:'new_'+Date.now(),name:'',category:'',price:'',image:'',description:'',status:'active'}); }}>+ Tambah Produk</button>
                                <button className="btn btn-secondary" onClick={() => { setPage('settings'); setEditSettings(true); }}>Edit Settings</button>
                            </div>
                        </div>
                    </div>
                )}
                {page === 'products' && !editProduct && (
                    <div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
                            <h1 className="admin__page-title" style={{margin:0}}>Products</h1>
                            <button className="btn btn-primary" onClick={() => setEditProduct({id:'new_'+Date.now(),name:'',category:'',price:'',image:'',description:'',status:'active'})}>+ Tambah Produk</button>
                        </div>
                        <div className="admin__table-wrap">
                            <table className="admin__table">
                                <thead><tr><th>Order</th><th>Nama</th><th>Kategori</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead>
                                <tbody>
                                    {products.map((p, idx) => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="admin__reorder-btns">
                                                    <button className="admin__reorder-btn" onClick={() => moveProduct(idx, -1)} disabled={idx === 0} aria-label="Move up">&#9650;</button>
                                                    <button className="admin__reorder-btn" onClick={() => moveProduct(idx, 1)} disabled={idx === products.length - 1} aria-label="Move down">&#9660;</button>
                                                </div>
                                            </td>
                                            <td>{p.name}</td>
                                            <td>{p.category}</td>
                                            <td>{p.price}</td>
                                            <td><span className={`admin__badge ${p.status === 'active' ? 'admin__badge--green' : 'admin__badge--red'}`}>{p.status}</span></td>
                                            <td>
                                                <button className="admin__action-btn" onClick={() => setEditProduct(p)}>Edit</button>
                                                <button className="admin__action-btn" onClick={() => window.open(`/product/${p.id}`, '_blank')} title="Preview">&#128065;</button>
                                                <button className="admin__action-btn admin__action-btn--danger" onClick={() => setProducts(products.filter(x => x.id !== p.id))}>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {page === 'products' && editProduct && (
                    <div>
                        <h1 className="admin__page-title">{editProduct.name ? 'Edit Produk' : 'Tambah Produk'}</h1>
                        <div className="admin__card">
                            <div className="admin__form">
                                <label>Nama Produk<input type="text" value={editProduct.name} onChange={e => setEditProduct({...editProduct, name: e.target.value})} /></label>
                                <label>Kategori<input type="text" value={editProduct.category} onChange={e => setEditProduct({...editProduct, category: e.target.value})} /></label>
                                <label>Harga<input type="text" value={editProduct.price} onChange={e => setEditProduct({...editProduct, price: e.target.value})} /></label>
                                <label>Deskripsi<textarea value={editProduct.description || ''} onChange={e => setEditProduct({...editProduct, description: e.target.value})} /></label>
                                <label>Image</label>
                                <div className={`admin__dropzone ${isDragging ? 'admin__dropzone--active' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                                    {dragPreview || editProduct.image ? (
                                        <div className="admin__dropzone-preview">
                                            <img src={dragPreview || editProduct.image} alt="Preview" style={{maxHeight:'160px',maxWidth:'100%',objectFit:'contain'}} />
                                            <p style={{fontSize:'0.75rem',marginTop:'8px',color:'rgba(17,17,17,0.5)'}}>Drop gambar baru untuk mengganti</p>
                                        </div>
                                    ) : (
                                        <div className="admin__dropzone-placeholder">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                            <p>Drag & drop gambar di sini</p>
                                            <span>atau masukkan URL di bawah</span>
                                        </div>
                                    )}
                                </div>
                                <label>Image URL<input type="text" value={editProduct.image || ''} onChange={e => { setEditProduct({...editProduct, image: e.target.value}); setDragPreview(null); }} placeholder="/Foto Produk/nama-file.PNG" /></label>
                                <label>Status<select value={editProduct.status} onChange={e => setEditProduct({...editProduct, status: e.target.value})}><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
                                <div style={{display:'flex',gap:'12px',marginTop:'20px'}}>
                                    <button className="btn btn-primary" onClick={() => { const exists = products.find(p => p.id === editProduct.id); if (exists) { setProducts(products.map(p => p.id === editProduct.id ? editProduct : p)); } else { setProducts([...products, editProduct]); } setEditProduct(null); setDragPreview(null); }}>Simpan</button>
                                    <button className="btn btn-secondary" onClick={() => { setEditProduct(null); setDragPreview(null); }}>Batal</button>
                                    {editProduct.name && <button className="btn btn-secondary" onClick={() => window.open(`/product/${editProduct.id}`, '_blank')}>&#128065; Preview</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {page === 'categories' && (
                    <div>
                        <h1 className="admin__page-title">Categories</h1>
                        <div className="admin__card">
                            <p style={{marginBottom:'16px',color:'rgba(17,17,17,0.6)'}}>Kategori yang tersedia di website:</p>
                            {['Baju Dinas (PDL, PDH, PDU, PIDSUS, PIDUM, Pembinaan, Adhyaksa)', 'Men Collection (Jas, Kemeja, Celana, One Set, Baju Dinas)', 'Women Collection (Blazer, Jas, Kebaya, Dress, One Set, Formal)', 'Custom Tailor'].map((c,i) => (
                                <div key={i} style={{padding:'12px 16px',borderBottom:'1px solid rgba(0,0,0,0.06)',fontSize:'0.9rem'}}>{c}</div>
                            ))}
                        </div>
                    </div>
                )}
                {page === 'content' && (
                    <div>
                        <h1 className="admin__page-title">Content Management</h1>
                        <div className="admin__card">
                            <h3>Hero Section</h3>
                            <div className="admin__form">
                                <label>Hero Title<input type="text" value={siteSettings.heroTitle} onChange={e => setSiteSettings({...siteSettings, heroTitle: e.target.value})} /></label>
                                <label>Hero Description<textarea value={siteSettings.heroDesc} onChange={e => setSiteSettings({...siteSettings, heroDesc: e.target.value})} /></label>
                            </div>
                        </div>
                        <div className="admin__card" style={{marginTop:'20px'}}>
                            <h3>About Page</h3>
                            <div className="admin__form">
                                <label>About Text<textarea value={siteSettings.aboutText} onChange={e => setSiteSettings({...siteSettings, aboutText: e.target.value})} rows="6" /></label>
                            </div>
                        </div>
                        <button className="btn btn-primary" style={{marginTop:'20px'}}>Simpan Perubahan</button>
                    </div>
                )}
                {page === 'settings' && (
                    <div>
                        <h1 className="admin__page-title">Settings</h1>
                        <div className="admin__card">
                            <h3>Informasi Kontak</h3>
                            <div className="admin__form">
                                <label>WhatsApp<input type="text" value={siteSettings.whatsapp} onChange={e => setSiteSettings({...siteSettings, whatsapp: e.target.value})} /></label>
                                <label>Phone<input type="text" value={siteSettings.phone} onChange={e => setSiteSettings({...siteSettings, phone: e.target.value})} /></label>
                                <label>Instagram<input type="text" value={siteSettings.instagram} onChange={e => setSiteSettings({...siteSettings, instagram: e.target.value})} /></label>
                                <label>TikTok<input type="text" value={siteSettings.tiktok} onChange={e => setSiteSettings({...siteSettings, tiktok: e.target.value})} /></label>
                                <label>Lokasi<input type="text" value={siteSettings.location} onChange={e => setSiteSettings({...siteSettings, location: e.target.value})} /></label>
                            </div>
                        </div>
                        <button className="btn btn-primary" style={{marginTop:'20px'}}>Simpan Settings</button>
                    </div>
                )}
            </main>
        </div>
    );
}

// ===== LAYOUT & APP =====
function Layout() {
    const location = useLocation();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Navbar />
            <main><Outlet /></main>
            <Footer />
            <a href={`https://wa.me/${B.wa}`} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat WhatsApp"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></a>
        </motion.div>
    );
}

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/baju-dinas" element={<CatalogPage title="Baju Dinas Kejaksaan" subtitle="Koleksi Utama" products={CATALOG.dinas} filters={['PDL','PDH','PDU','PIDSUS','PIDUM','Pembinaan','Adhyaksa']} />} />
                <Route path="/men-collection" element={<CatalogPage title="Koleksi Pria" subtitle="Men's Collection" products={CATALOG.men} filters={['Jas','Kemeja','Celana','One Set','Baju Dinas']} />} />
                <Route path="/women-collection" element={<CatalogPage title="Koleksi Wanita" subtitle="Women's Collection" products={CATALOG.women} filters={['Blazer','Jas','Kebaya','Dress','One Set','Formal']} />} />
                <Route path="/custom-tailor" element={<CatalogPage title="Custom Tailor" subtitle="Our Process" products={CATALOG.custom} />} />
                <Route path="/rental" element={<RentalPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
    );
}

createRoot(document.getElementById('app')).render(<BrowserRouter><App /></BrowserRouter>);
