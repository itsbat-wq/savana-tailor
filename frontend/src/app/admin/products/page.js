'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import AdminShell from '@/components/admin/AdminShell';
import { adminGetProducts, adminDeleteProduct } from '@/lib/api';
import styles from './products.module.css';

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', search],
    queryFn: () => adminGetProducts({ search, per_page: 50 }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduct,
    onSuccess: () => {
      toast.success('Produk dihapus');
      qc.invalidateQueries({ queryKey: ['admin-products'] });
    },
    onError: () => toast.error('Gagal menghapus produk'),
  });

  const handleDelete = (product) => {
    if (!confirm(`Hapus produk "${product.name}"?`)) return;
    deleteMutation.mutate(product.id);
  };

  const products = data?.data ?? [];

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Produk</h1>
            <p className={styles.sub}>{products.length} produk ditemukan</p>
          </div>
          <a href="/admin/products/create" className={styles.addBtn}>
            <Plus size={16} /> Tambah Produk
          </a>
        </div>

        {/* Search */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama produk..." className={styles.searchInput} />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          {isLoading ? (
            <div className={styles.tableLoad}>Memuat produk...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan={6} className={styles.emptyRow}>Belum ada produk</td></tr>
                ) : products.map(p => (
                  <tr key={p.id} className={styles.row}>
                    <td>
                      <div className={styles.productCell}>
                        {p.images?.[0] && (
                          <div className={styles.thumb}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.images[0].startsWith('/Foto') ? p.images[0] : `http://127.0.0.1:8000${p.images[0]}`} alt="" />
                          </div>
                        )}
                        <div>
                          <p className={styles.productName}>{p.name}</p>
                          <p className={styles.productSlug}>{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.badge}>{p.category?.name}</span></td>
                    <td className={styles.price}>{p.price_display}</td>
                    <td>
                      <span className={`${styles.statusPill} ${p.status === 'active' ? styles.active : styles.inactive}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>{p.is_featured ? '⭐' : '—'}</td>
                    <td>
                      <div className={styles.actions}>
                        <a href={`/admin/products/${p.id}/edit`} className={styles.editBtn} title="Edit">
                          <Pencil size={14} />
                        </a>
                        <button onClick={() => handleDelete(p)} className={styles.deleteBtn} title="Hapus"
                          disabled={deleteMutation.isPending}>
                          <Trash2 size={14} />
                        </button>
                      </div>
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
