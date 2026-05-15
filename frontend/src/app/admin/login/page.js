'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import useAuthStore from '@/stores/authStore';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) router.replace('/admin/dashboard');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Email dan password wajib diisi'); return; }
    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Login berhasil!');
      router.push('/admin/dashboard');
    } catch (err) {
      const msg = err.response?.data?.errors?.email?.[0]
        ?? err.response?.data?.message
        ?? 'Login gagal. Periksa email dan password.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png"
            alt="Savana Tailor"
            width={64} height={64}
            className={styles.logoImg}
          />
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.sub}>Savana Tailor Boutique</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@savanatailor.com"
              autoComplete="email"
              className={styles.input}
              disabled={loading}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className={styles.input}
              disabled={loading}
            />
          </label>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <><span className={styles.spinner} /> Masuk...</>
            ) : 'Masuk'}
          </button>
        </form>

        <div className={styles.footer}>
          <a href="/" className={styles.backLink}>← Kembali ke Website</a>
        </div>
      </div>
    </div>
  );
}
