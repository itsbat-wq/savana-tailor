import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchDashboard } from '../../api/admin';

export default function DashboardPage() {
    const { data, isLoading } = useQuery({ queryKey: ['admin-dashboard'], queryFn: fetchDashboard });
    const stats = data?.data ?? {};

    const statCards = [
        { label: 'Total Produk', value: stats.total_products },
        { label: 'Produk Aktif', value: stats.active_products },
        { label: 'Featured', value: stats.featured_products },
        { label: 'Kategori', value: stats.total_categories },
    ];

    return (
        <div>
            <h1 className="admin__page-title">Dashboard</h1>
            <div className="admin__stats">
                {statCards.map((s, i) => (
                    <div key={i} className="admin__stat-card">
                        <span className="admin__stat-num">{isLoading ? '—' : s.value}</span>
                        <span className="admin__stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
            <div className="admin__card" style={{ marginTop: 30 }}>
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                    <Link to="/admin/products" className="btn btn-primary">+ Tambah Produk</Link>
                    <Link to="/admin/categories" className="btn btn-secondary">Kelola Kategori</Link>
                    <Link to="/admin/settings" className="btn btn-secondary">Edit Settings</Link>
                </div>
            </div>
            {stats.recent_products?.length > 0 && (
                <div className="admin__card" style={{ marginTop: 20 }}>
                    <h3>Produk Terbaru</h3>
                    <div className="admin__table-wrap" style={{ marginTop: 12 }}>
                        <table className="admin__table">
                            <thead><tr><th>Nama</th><th>Kategori</th><th>Status</th><th>Ditambahkan</th></tr></thead>
                            <tbody>
                                {stats.recent_products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.category}</td>
                                        <td><span className={`admin__badge ${p.status === 'active' ? 'admin__badge--green' : 'admin__badge--red'}`}>{p.status}</span></td>
                                        <td>{p.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
