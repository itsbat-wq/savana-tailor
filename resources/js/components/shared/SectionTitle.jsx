import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({ subtitle, title, description, align = 'center', light = false }) {
    return (
        <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
            {subtitle && (
                <span className="section-title__subtitle">{subtitle}</span>
            )}
            <h2 className="section-title__heading heading-lg">{title}</h2>
            <div className={`gold-divider ${align === 'center' ? 'gold-divider-center' : ''}`} />
            {description && (
                <p className="section-title__desc">{description}</p>
            )}
        </div>
    );
}
