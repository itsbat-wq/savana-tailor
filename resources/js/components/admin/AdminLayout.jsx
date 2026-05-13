import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuthStore from '../../stores/authStore';

const menu = [
    { path: '/admin', label: 'Dashboard', exact: true },
    { path: '/admin/products', label: 'Produk' },
    { path: '/admin/categories', label: 'Kategori' },
    { path: '/admin/rentals', label: 'Rental' },
    { path: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        toast.success('Berhasil logout');
        navigate('/admin/login');
    };

    const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);

    return (
        <div className="admin">
            <aside className="admin__sidebar">
                <div className="admin__sidebar-header">
                    <h2 className="admin__sidebar-title">Admin Panel</h2>
                    <p className="admin__sidebar-sub">Savana Taylor</p>
                </div>
                <nav className="admin__sidebar-nav">
                    {menu.map(m => (
                        <Link key={m.path} to={m.path} className={`admin__sidebar-btn ${isActive(m.path, m.exact) ? 'admin__sidebar-btn--active' : ''}`}>{m.label}</Link>
                    ))}
                </nav>
                <div className="admin__sidebar-footer">
                    {user && <p style={{ padding: '8px 20px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{user.name}</p>}
                    <Link to="/" className="admin__sidebar-btn">&#8592; Lihat Website</Link>
                    <button className="admin__sidebar-btn" onClick={handleLogout} style={{ color: '#ef4444' }}>Logout</button>
                </div>
            </aside>
            <main className="admin__main">
                <Outlet />
            </main>
        </div>
    );
}
