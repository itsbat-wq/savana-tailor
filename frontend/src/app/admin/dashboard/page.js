'use client';
import { useQuery } from '@tanstack/react-query';
import { Package, Tag, Shirt, TrendingUp } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { adminDashboard } from '@/lib/api';
import styles from './dashboard.module.css';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ background: color + '20', color }}>
        <Icon size={22} />
      </div>
      <div>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value ?? '—'}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-dashboard'], queryFn: adminDashboard });
  const stats = data?.data ?? data ?? {};

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Selamat datang di Admin Panel Savana Taylor</p>
        </div>

        <div className={styles.statsGrid}>
          <StatCard icon={Package} label="Total Produk" value={isLoading ? '...' : stats.total_products} color="#6B0F1A" />
          <StatCard icon={Tag} label="Kategori" value={isLoading ? '...' : stats.total_categories} color="#C9A84C" />
          <StatCard icon={Shirt} label="Rental Items" value={isLoading ? '...' : stats.total_rentals} color="#1d4ed8" />
          <StatCard icon={TrendingUp} label="Produk Aktif" value={isLoading ? '...' : stats.active_products} color="#16a34a" />
        </div>

        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Quick Actions</h2>
          <div className={styles.quickActions}>
            <a href="/admin/products" className={styles.quickBtn}>
              <Package size={18} /> Kelola Produk
            </a>
            <a href="/admin/categories" className={styles.quickBtn}>
              <Tag size={18} /> Kelola Kategori
            </a>
            <a href="/admin/rentals" className={styles.quickBtn}>
              <Shirt size={18} /> Kelola Rental
            </a>
            <a href="/admin/settings" className={styles.quickBtn}>
              Kelola Pengaturan
            </a>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Panduan Testing Backend</h2>
          <p className={styles.infoText}>
            Verifikasi koneksi frontend-backend berjalan:
          </p>
          <ol className={styles.infoList}>
            <li>Halaman ini menampilkan data real dari <code>GET /api/admin/dashboard</code></li>
            <li>Data produk di halaman utama diambil dari <code>GET /api/v1/products/featured</code></li>
            <li>Produk dari kategori diambil dari <code>GET /api/v1/products?category=baju-dinas</code></li>
            <li>Setiap produk punya <code>whatsapp_url</code> dinamis dari model Laravel</li>
            <li>Gambar di seeder pakai path <code>/Foto Produk/...</code> yang ada di folder <code>public/</code> Next.js</li>
          </ol>
        </div>
      </div>
    </AdminShell>
  );
}
