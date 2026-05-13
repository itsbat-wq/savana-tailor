'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import AdminShell from '@/components/admin/AdminShell';
import { adminGetSettings, adminUpdateSettings } from '@/lib/api';
import styles from './settings.module.css';

export default function AdminSettingsPage() {
  const [form, setForm] = useState({});
  const { data, isLoading } = useQuery({ queryKey: ['admin-settings'], queryFn: adminGetSettings });

  useEffect(() => {
    if (data?.data) setForm(data.data);
    else if (data) setForm(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => adminUpdateSettings(form),
    onSuccess: () => toast.success('Pengaturan disimpan!'),
    onError: () => toast.error('Gagal menyimpan pengaturan'),
  });

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const FIELDS = [
    { key: 'site_name', label: 'Nama Situs', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'whatsapp', label: 'Nomor WhatsApp', type: 'text', placeholder: '6281317935360' },
    { key: 'address', label: 'Alamat', type: 'textarea' },
    { key: 'instagram', label: 'Instagram', type: 'text' },
    { key: 'tiktok', label: 'TikTok', type: 'text' },
  ];

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pengaturan</h1>
          <p className={styles.sub}>Kelola informasi dan kontak situs</p>
        </div>
        {isLoading ? <p>Memuat pengaturan...</p> : (
          <form onSubmit={e => { e.preventDefault(); mutation.mutate(); }} className={styles.form}>
            {FIELDS.map(f => (
              <label key={f.key} className={styles.field}>
                <span className={styles.fieldLabel}>{f.label}</span>
                {f.type === 'textarea'
                  ? <textarea value={form[f.key] ?? ''} onChange={e => set(f.key, e.target.value)} className={styles.input} rows={3} />
                  : <input type="text" value={form[f.key] ?? ''} placeholder={f.placeholder}
                      onChange={e => set(f.key, e.target.value)} className={styles.input} />
                }
              </label>
            ))}
            <div className={styles.footer}>
              <button type="submit" className={styles.saveBtn} disabled={mutation.isPending}>
                {mutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}
