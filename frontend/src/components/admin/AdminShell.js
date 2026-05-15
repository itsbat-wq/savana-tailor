'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, Shirt, Settings, LogOut, Menu, X, ChevronRight, Globe
} from 'lucide-react';
import { toast } from 'sonner';
import useAuthStore from '@/stores/authStore';
import styles from './AdminShell.module.css';

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Produk' },
  { href: '/admin/categories', icon: Tag, label: 'Kategori' },
  { href: '/admin/rentals', icon: Shirt, label: 'Rental' },
  { href: '/admin/settings', icon: Settings, label: 'Pengaturan' },
];

export default function AdminShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, checkAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Guard: redirect to login if not authenticated after check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    toast.success('Berhasil logout');
    router.push('/admin/login');
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Memverifikasi sesi...</p>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Image src="/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png" alt="Logo" width={48} height={48} style={{ borderRadius: '50%' }} />
          <div>
            <span className={styles.brandName}>SAVANA TAILOR</span>
            <span className={styles.brandSub}>Admin Panel</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}
                className={`${styles.navItem} ${active ? styles.navActive : ''}`}
                onClick={() => setSidebarOpen(false)}>
                <item.icon size={18} className={styles.navIcon} />
                <span>{item.label}</span>
                {active && <ChevronRight size={14} className={styles.navChevron} />}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user?.name?.charAt(0) ?? 'A'}</div>
            <div>
              <p className={styles.userName}>{user?.name ?? 'Admin'}</p>
              <p className={styles.userEmail}>{user?.email ?? ''}</p>
            </div>
          </div>
          <div className={styles.footerActions}>
            <Link href="/" target="_blank" className={styles.footerBtn} title="Lihat Website">
              <Globe size={16} />
            </Link>
            <button onClick={handleLogout} className={`${styles.footerBtn} ${styles.logoutBtn}`} title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.topbarUser}>{user?.name ?? 'Admin'}</span>
          </div>
        </header>

        {/* Page content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
