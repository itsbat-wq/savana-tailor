import React from 'react';
import { MapPin, Phone, Clock, AtSign, ArrowRight } from 'lucide-react';
import SectionTitle from '../../components/shared/SectionTitle';
import './ContactPage.css';

export default function ContactPage() {
    return (
        <>
            <div className="page-hero page-hero--black">
                <div className="container">
                    <SectionTitle subtitle="Get In Touch" title="Hubungi Kami" description="Konsultasikan kebutuhan pakaian Anda." light />
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="contact-info__card"><div className="contact-info__icon"><MapPin size={22} strokeWidth={1.5} /></div><div><h4 className="contact-info__title">Alamat</h4><p className="contact-info__text">Jakarta, Indonesia</p></div></div>
                            <div className="contact-info__card"><div className="contact-info__icon"><Phone size={22} strokeWidth={1.5} /></div><div><h4 className="contact-info__title">WhatsApp</h4><p className="contact-info__text">+62 812-3456-7890</p></div></div>
                            <div className="contact-info__card"><div className="contact-info__icon"><AtSign size={22} strokeWidth={1.5} /></div><div><h4 className="contact-info__title">Social Media</h4><p className="contact-info__text">@savanataylor</p></div></div>
                            <div className="contact-info__card"><div className="contact-info__icon"><Clock size={22} strokeWidth={1.5} /></div><div><h4 className="contact-info__title">Jam Operasional</h4><p className="contact-info__text">Sen - Sab: 09:00 - 18:00</p><p className="contact-info__text">* Pertemuan harus dengan janji</p></div></div>
                        </div>
                        <div className="contact-cta-card">
                            <h3 className="heading-sm">Book Appointment</h3>
                            <div className="gold-divider" />
                            <p>Untuk konsultasi dan pengukuran, silakan book appointment terlebih dahulu melalui WhatsApp.</p>
                            <div className="contact-cta-card__note"><strong>Penting:</strong> Pertemuan harus dengan janji terlebih dahulu.</div>
                            <a href="https://wa.me/6281234567890?text=Halo%20Savana%20Taylor%2C%20saya%20ingin%20book%20appointment" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{width:'100%'}}>Book via WhatsApp <ArrowRight size={16} /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
