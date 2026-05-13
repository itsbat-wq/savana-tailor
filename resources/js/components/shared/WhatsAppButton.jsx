import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
    const phoneNumber = '6281234567890';
    const message = encodeURIComponent('Halo Savana Taylor, saya ingin bertanya tentang layanan Anda.');

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            aria-label="Chat via WhatsApp"
        >
            <MessageCircle size={24} />
        </a>
    );
}
