import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

    useEffect(() => { checkAuth(); }, [checkAuth]);

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f8f6' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="skeleton" style={{ width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px' }} />
                    <p style={{ color: 'rgba(17,17,17,0.5)', fontSize: '0.9rem' }}>Memverifikasi sesi...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

    return children;
}
