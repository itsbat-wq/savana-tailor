import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminFetchCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from '../../api/admin';

const EMPTY = { name: '', description: '', sort_order: 0, is_active: true };

export default function CategoriesPage() {
    const qc = useQueryClient();
    const [form, setForm] = useState(null);

    const { data, isLoading } = useQuery({ queryKey: ['admin-categories'], queryFn: adminFetchCategories });
    const categories = data?.data ?? [];

    const saveMutation = useMutation({
        mutationFn: (d) => form?.id ? adminUpdateCategory(form.id, d) : adminCreateCategory(d),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-categories'] }); toast.success('Kategori disimpan!'); setForm(null); },
        onError: (e) => toast.error(e.response?.data?.message ?? 'Gagal'),
    });

    const deleteMutation = useMutation({
        mutationFn: adminDeleteCategory,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-categories'] }); toast.success('Kategori dihapus'); },
        onError: (e) => toast.error(e.response?.data?.message ?? 'Gagal menghapus'),
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className="admin__page-title" style={{ margin: 0 }}>Kategori</h1>
                <button className="btn btn-primary" onClick={() => setForm(EMPTY)}>+ Tambah</button>
            </div>
            {form && (
                <div className="admin__card" style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>{form.id ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                    <div className="admin__form">
                        <label>Nama<input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></label>
                        <label>Deskripsi<textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></label>
                        <label>Sort Order<input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} /></label>
                        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} style={{ width: 'auto' }} />
                            Aktif
                        </label>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-primary" onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>Simpan</button>
                            <button className="btn btn-secondary" onClick={() => setForm(null)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="admin__card">
                <div className="admin__table-wrap">
                    <table className="admin__table">
                        <thead><tr><th>Nama</th><th>Slug</th><th>Produk</th><th>Status</th><th>Aksi</th></tr></thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Memuat...</td></tr> :
                                categories.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 500 }}>{c.name}</td>
                                        <td style={{ fontSize: '0.8rem', color: '#888' }}>{c.slug}</td>
                                        <td>{c.products_count ?? 0}</td>
                                        <td><span className={`admin__badge ${c.is_active ? 'admin__badge--green' : 'admin__badge--red'}`}>{c.is_active ? 'Aktif' : 'Nonaktif'}</span></td>
                                        <td>
                                            <button className="admin__action-btn" onClick={() => setForm(c)}>Edit</button>
                                            <button className="admin__action-btn admin__action-btn--danger" onClick={() => { if (confirm(`Hapus "${c.name}"?`)) deleteMutation.mutate(c.id); }}>Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
