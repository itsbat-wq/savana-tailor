import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/layout/LoadingScreen';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/public/HomePage'));
const BajuDinasPage = lazy(() => import('./pages/public/BajuDinasPage'));
const MenCollectionPage = lazy(() => import('./pages/public/MenCollectionPage'));
const WomenCollectionPage = lazy(() => import('./pages/public/WomenCollectionPage'));
const CustomTailorPage = lazy(() => import('./pages/public/CustomTailorPage'));
const RentalPage = lazy(() => import('./pages/public/RentalPage'));
const MembershipPage = lazy(() => import('./pages/public/MembershipPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const ProductDetailPage = lazy(() => import('./pages/public/ProductDetailPage'));

export default function App() {
    return (
        <>
            <Toaster position="top-right" richColors />
            <AnimatePresence mode="wait">
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/baju-dinas" element={<BajuDinasPage />} />
                            <Route path="/men-collection" element={<MenCollectionPage />} />
                            <Route path="/women-collection" element={<WomenCollectionPage />} />
                            <Route path="/custom-tailor" element={<CustomTailorPage />} />
                            <Route path="/rental" element={<RentalPage />} />
                            <Route path="/membership" element={<MembershipPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/product/:slug" element={<ProductDetailPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AnimatePresence>
        </>
    );
}
