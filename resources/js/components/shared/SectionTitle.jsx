import React from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.css';

export default function SectionTitle({ subtitle, title, description, align = 'center', light = false }) {
    return (
        <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
            {subtitle && (
                <motion.span
                    className="section-title__subtitle"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {subtitle}
                </motion.span>
            )}
            <motion.h2
                className="section-title__heading heading-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                {title}
            </motion.h2>
            <motion.div
                className={`gold-divider ${align === 'center' ? 'gold-divider-center' : ''}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            />
            {description && (
                <motion.p
                    className="section-title__desc"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}
