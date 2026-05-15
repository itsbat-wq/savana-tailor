'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AdminShell from '@/components/admin/AdminShell';
import { adminGetCategories, adminDeleteCategory } from '@/lib/api';
import styles from '../products/products.module.css';

export default function AdminCategoriesPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-categories'], queryFn: adminGetCategories });
  const deleteMutation = useMutation({
    mutationFn: adminDeleteCategory,
    onSuccess: () => { toast.success('Kategori dihapus'); qc.invalidateQueries({ queryKey: ['admin-categories'] }); },
    onError: (e) => toast.error(e.response?.data?.message ?? 'Gagal menghapus kategori'),
  });
  const categories = data?.data ?? [];

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Kategori</h1>
            <p className={styles.sub}>{categories.length} kategori</p>
          </div>
          <Link href="/admin/categories/create" className={styles.addBtn}><Plus size={16} /> Tambah Kategori</Link>
        </div>
        <div className={styles.tableWrap}>
          {isLoading ? <div className={styles.tableLoad}>Memuat...</div> : (
            <table className={styles.table}>
              <thead><tr><th>#</th><th>Nama</th><th>Slug</th><th>Deskripsi</th><th>Aktif</th><th>Aksi</th></tr></thead>
              <tbody>
                {categories.length === 0 ? <tr><td colSpan={6} className={styles.emptyRow}>Belum ada kategori</td></tr>
                  : categories.map((c, i) => (
                    <tr key={c.id} className={styles.row}>
                      <td>{i + 1}</td>
                      <td className={styles.productName}>{c.name}</td>
                      <td><code style={{ fontSize: '0.75rem', background: '#f3f4f6', padding: '2px 6px' }}>{c.slug}</code></td>
                      <td style={{ color: '#9e9e9e', fontSize: '0.8rem' }}>{c.description ?? '—'}</td>
                      <td>{c.is_active ? <span className={`${styles.statusPill} ${styles.active}`}>Aktif</span> : <span className={`${styles.statusPill} ${styles.inactive}`}>Nonaktif</span>}</td>
                      <td>
                        <button onClick={() => { if (confirm(`Hapus kategori "${c.name}"?`)) deleteMutation.mutate(c.id); }}
                          className={styles.deleteBtn} disabled={deleteMutation.isPending}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
