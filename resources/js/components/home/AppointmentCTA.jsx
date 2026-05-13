import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import './AppointmentCTA.css';

export default function AppointmentCTA() {
    return (
        <section className="cta section">
            <div className="container">
                <div className="cta__card">
                    <div className="cta__content">
                        <div className="cta__icon">
                            <Calendar size={32} strokeWidth={1.5} />
                        </div>
                        <h2 className="cta__title heading-md">
                            Siap Untuk Tampil<br />
                            <span className="text-gold">Lebih Berkelas?</span>
                        </h2>
                        <p className="cta__desc">
                            Book appointment sekarang dan konsultasikan kebutuhan pakaian Anda
                            dengan tim profesional kami. Gratis konsultasi awal.
                        </p>
                        <div className="cta__actions">
                            <Link to="/contact" className="btn btn-primary">
                                Book Appointment <ArrowRight size={16} />
                            </Link>
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                Chat WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
