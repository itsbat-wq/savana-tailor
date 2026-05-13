'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import AdminShell from '@/components/admin/AdminShell';
import { adminGetRentals, adminDeleteRental } from '@/lib/api';
import styles from '../products/products.module.css';

export default function AdminRentalsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-rentals'], queryFn: adminGetRentals });
  const deleteMutation = useMutation({
    mutationFn: adminDeleteRental,
    onSuccess: () => { toast.success('Rental dihapus'); qc.invalidateQueries({ queryKey: ['admin-rentals'] }); },
    onError: () => toast.error('Gagal menghapus rental'),
  });
  const rentals = data?.data ?? [];

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Rental</h1>
            <p className={styles.sub}>{rentals.length} item rental</p>
          </div>
          <a href="/admin/rentals/create" className={styles.addBtn}><Plus size={16} /> Tambah Rental</a>
        </div>
        <div className={styles.tableWrap}>
          {isLoading ? <div className={styles.tableLoad}>Memuat...</div> : (
            <table className={styles.table}>
              <thead><tr><th>Nama</th><th>Harga</th><th>Status</th><th>Aksi</th></tr></thead>
              <tbody>
                {rentals.length === 0 ? <tr><td colSpan={4} className={styles.emptyRow}>Belum ada item rental</td></tr>
                  : rentals.map(r => (
                    <tr key={r.id} className={styles.row}>
                      <td className={styles.productName}>{r.name}</td>
                      <td className={styles.price}>{r.price_display ?? '—'}</td>
                      <td>
                        <span className={`${styles.statusPill} ${r.status === 'available' ? styles.active : styles.inactive}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => { if (confirm(`Hapus "${r.name}"?`)) deleteMutation.mutate(r.id); }}
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
