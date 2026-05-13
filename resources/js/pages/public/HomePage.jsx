import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import USPBadges from '../../components/home/USPBadges';
import CollectionGrid from '../../components/home/CollectionGrid';
import BestSeller from '../../components/home/BestSeller';
import ProcessSection from '../../components/home/ProcessSection';
import AppointmentCTA from '../../components/home/AppointmentCTA';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <USPBadges />
            <CollectionGrid />
            <BestSeller />
            <ProcessSection />
            <AppointmentCTA />
        </>
    );
}
