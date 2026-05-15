'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AdminShell from '@/components/admin/AdminShell';
import { adminCreateCategory } from '@/lib/api';
import styles from '../categories.module.css';

const formStyles = {
  container: { background: '#fff', padding: '32px', border: '1px solid #e5e7eb' },
  field: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  checkboxWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  checkbox: { width: '16px', height: '16px', accentColor: '#C9A84C' },
};

export default function CreateCategoryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    description: '',
    is_active: true,
  });

  const mutation = useMutation({
    mutationFn: (data) => adminCreateCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      toast.success('Kategori berhasil ditambahkan');
      router.push('/admin/categories');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Gagal menambahkan kategori');
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Nama kategori wajib diisi'); return; }

    mutation.mutate({
      ...form,
      is_active: form.is_active ? 1 : 0,
    });
  };

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Tambah Kategori</h1>
            <p className={styles.sub}>Buat kategori baru untuk produk</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formStyles.container}>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Nama Kategori</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama kategori"
              style={formStyles.input}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={formStyles.field}>
            <label style={formStyles.label}>Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi kategori..."
              style={formStyles.textarea}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={{ ...formStyles.field, marginBottom: '24px' }}>
            <div style={formStyles.checkboxWrap}>
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                id="is_active"
                style={formStyles.checkbox}
              />
              <label htmlFor="is_active" style={{ ...formStyles.label, margin: 0 }}>Kategori Aktif</label>
            </div>
          </div>

          <button
            type="submit"
            className={styles.addBtn}
            disabled={mutation.isPending}
            style={{ opacity: mutation.isPending ? 0.6 : 1 }}
          >
            {mutation.isPending ? 'Menyimpan...' : 'Simpan Kategori'}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
