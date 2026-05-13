import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RentalPage from './pages/RentalPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProductsPage from './pages/admin/ProductsPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import RentalsPage from './pages/admin/RentalsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminLayout from './components/admin/AdminLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 1000 * 60 * 5, retry: 1 },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Toaster position="top-right" richColors />
                <Routes>
                    {/* Public */}
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/baju-dinas" element={<CatalogPage categorySlug="baju-dinas" title="Baju Dinas Kejaksaan" subtitle="Koleksi Utama" />} />
                        <Route path="/men-collection" element={<CatalogPage categorySlug="men-collection" title="Koleksi Pria" subtitle="Men's Collection" />} />
                        <Route path="/women-collection" element={<CatalogPage categorySlug="women-collection" title="Koleksi Wanita" subtitle="Women's Collection" />} />
                        <Route path="/custom-tailor" element={<CatalogPage categorySlug="custom-tailor" title="Custom Tailor" subtitle="Our Process" />} />
                        <Route path="/rental" element={<RentalPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/product/:slug" element={<ProductDetailPage />} />
                    </Route>
                    {/* Admin */}
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<DashboardPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route path="rentals" element={<RentalsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

createRoot(document.getElementById('app')).render(<App />);
