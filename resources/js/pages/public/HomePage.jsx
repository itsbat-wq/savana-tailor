import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/home/HeroSection';
import USPBadges from '../../components/home/USPBadges';
import CollectionGrid from '../../components/home/CollectionGrid';
import BestSeller from '../../components/home/BestSeller';
import ProcessSection from '../../components/home/ProcessSection';
import AppointmentCTA from '../../components/home/AppointmentCTA';

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Savana Taylor Boutique — Custom Made • Exclusive • Elegant • Timeless</title>
                <meta name="description" content="Premium custom tailor untuk baju dinas, formal wear, dan rental. 10+ tahun pengalaman melayani profesional Indonesia." />
            </Helmet>
            <HeroSection />
            <USPBadges />
            <CollectionGrid />
            <BestSeller />
            <ProcessSection />
            <AppointmentCTA />
        </>
    );
}
