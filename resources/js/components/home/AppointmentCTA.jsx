import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import './AppointmentCTA.css';

export default function AppointmentCTA() {
    return (
        <section className="cta section">
            <div className="container">
                <motion.div
                    className="cta__card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="cta__content">
                        <motion.div
                            className="cta__icon"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        >
                            <Calendar size={32} strokeWidth={1.5} />
                        </motion.div>
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
                </motion.div>
            </div>
        </section>
    );
}
