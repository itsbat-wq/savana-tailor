import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminFetchProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminFetchCategories, uploadImage } from '../../api/admin';

const EMPTY = { name: '', category_id: '', description: '', price: '', price_display: '', images: [], features: [], whatsapp_text: '', status: 'active', is_featured: false };

export default function ProductsPage() {
    const qc = useQueryClient();
    const [editing, setEditing] = useState(null); // null = list, 'new' or product obj
    const [form, setForm] = useState(EMPTY);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState('');
    const fileRef = useRef();

    const { data: productsData, isLoading } = useQuery({ queryKey: ['admin-products'], queryFn: adminFetchProducts });
    const { data: catsData } = useQuery({ queryKey: ['admin-categories'], queryFn: adminFetchCategories });

    const products = productsData?.data ?? [];
    const categories = catsData?.data ?? [];

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    const saveMutation = useMutation({
        mutationFn: (data) => editing === 'new' ? adminCreateProduct(data) : adminUpdateProduct(form.id, data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); toast.success('Produk disimpan!'); setEditing(null); },
        onError: (e) => toast.error(e.response?.data?.message ?? 'Gagal menyimpan'),
    });

    const deleteMutation = useMutation({
        mutationFn: adminDeleteProduct,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-products'] }); toast.success('Produk dihapus'); },
        onError: () => toast.error('Gagal menghapus'),
    });

    const openNew = () => { setForm(EMPTY); setEditing('new'); };
    const openEdit = (p) => { setForm({ ...p, features: p.features ?? [], images: p.images ?? [] }); setEditing(p.id); };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await uploadImage(file, 'products');
            setForm(f => ({ ...f, images: [...f.images, res.path] }));
            toast.success('Gambar diupload!');
        } catch { toast.error('Upload gagal'); }
        finally { setUploading(false); }
    };

    const removeImage = (idx) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

    const handleSave = () => {
        const data = { ...form, price: parseInt(form.price) || 0, is_featured: Boolean(form.is_featured) };
        if (typeof data.features === 'string') data.features = data.features.split('\n').filter(Boolean);
        saveMutation.mutate(data);
    };

    if (editing !== null) {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h1 className="admin__page-title" style={{ margin: 0 }}>{editing === 'new' ? 'Tambah Produk' : 'Edit Produk'}</h1>
                    <button className="btn btn-secondary" onClick={() => setEditing(null)}>&#8592; Kembali</button>
                </div>
                <div className="admin__card">
                    <div className="admin__form">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <label>Nama Produk *<input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></label>
                            <label>Kategori *
                                <select value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}>
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </label>
                            <label>Harga (angka) *<input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="2500000" /></label>
                            <label>Tampilan Harga<input value={form.price_display} onChange={e => setForm(f => ({ ...f, price_display: e.target.value }))} placeholder="Rp 2.500.000" /></label>
                        </div>
                        <label>Deskripsi<textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></label>
                        <label>
                            Fitur/Keunggulan (1 baris = 1 poin)
                            <textarea value={Array.isArray(form.features) ? form.features.join('\n') : form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value.split('\n') }))} placeholder="Cutting modern & sleek&#10;Nyaman dipakai&#10;Custom ukuran" />
                        </label>
                        <label style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
                            Pesan WhatsApp Custom
                            <small style={{ fontWeight: 400, color: '#999', marginLeft: 8 }}>Teks yang dikirim ke WA saat tombol Pesan diklik</small>
                            <textarea value={form.whatsapp_text ?? ''} onChange={e => setForm(f => ({ ...f, whatsapp_text: e.target.value }))} rows={3} placeholder="Halo Savana Taylor, saya tertarik dengan produk [Nama Produk]..." style={{ borderColor: '#D4AF37', borderWidth: 2 }} />
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <label>Status
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </label>
                            <label style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 24 }}>
                                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} style={{ width: 'auto' }} />
                                Tampilkan di Best Sellers
                            </label>
                        </div>
                        {/* Image Upload */}
                        <div>
                            <label style={{ marginBottom: 8, display: 'block' }}>Foto Produk</label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                                {(form.images ?? []).map((img, i) => (
                                    <div key={i} style={{ position: 'relative' }}>
                                        <img src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover', border: '1px solid #ddd' }} />
                                        <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12, lineHeight: '20px', textAlign: 'center', padding: 0 }}>×</button>
                                    </div>
                                ))}
                                <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: 80, height: 80, border: '2px dashed #D4AF37', background: '#fffdf5', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: '0.7rem', color: '#D4AF37' }}>
                                    {uploading ? '...' : <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>Upload</>}
                                </button>
                                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-primary" onClick={handleSave} disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Menyimpan...' : 'Simpan'}</button>
                            <button className="btn btn-secondary" onClick={() => setEditing(null)}>Batal</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className="admin__page-title" style={{ margin: 0 }}>Produk</h1>
                <button className="btn btn-primary" onClick={openNew}>+ Tambah Produk</button>
            </div>
            <div style={{ marginBottom: 16 }}>
                <input placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '10px 14px', border: '1px solid rgba(0,0,0,0.12)', fontSize: '0.9rem', width: '100%', maxWidth: 320 }} />
            </div>
            <div className="admin__card">
                <div className="admin__table-wrap">
                    <table className="admin__table">
                        <thead><tr><th>Foto</th><th>Nama</th><th>Kategori</th><th>Harga</th><th>Status</th><th>WA Custom</th><th>Aksi</th></tr></thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}>Memuat...</td></tr> :
                                filtered.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.images?.[0] ? <img src={p.images[0]} style={{ width: 48, height: 48, objectFit: 'cover' }} alt="" /> : <div style={{ width: 48, height: 48, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#999' }}>No img</div>}</td>
                                        <td style={{ fontWeight: 500 }}>{p.name}</td>
                                        <td>{p.category?.name}</td>
                                        <td>{p.price_display}</td>
                                        <td><span className={`admin__badge ${p.status === 'active' ? 'admin__badge--green' : 'admin__badge--red'}`}>{p.status}</span></td>
                                        <td><span style={{ fontSize: '0.7rem', color: p.whatsapp_text ? '#1a7a1a' : '#999' }}>{p.whatsapp_text ? '✓ Custom' : 'Default'}</span></td>
                                        <td>
                                            <button className="admin__action-btn" onClick={() => openEdit(p)}>Edit</button>
                                            <button className="admin__action-btn admin__action-btn--danger" onClick={() => { if (confirm(`Hapus "${p.name}"?`)) deleteMutation.mutate(p.id); }}>Hapus</button>
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
