import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../shared/WhatsAppButton';

export default function Layout() {
    return (
        <div className="layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
