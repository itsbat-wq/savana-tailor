import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminFetchRentals, adminCreateRental, adminUpdateRental, adminDeleteRental, uploadImage } from '../../api/admin';

const EMPTY = { name: '', description: '', price_per_day: '', price_display: '', images: [], whatsapp_text: '', status: 'available' };

export default function RentalsPage() {
    const qc = useQueryClient();
    const [form, setForm] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef();

    const { data, isLoading } = useQuery({ queryKey: ['admin-rentals'], queryFn: adminFetchRentals });
    const rentals = data?.data ?? [];

    const saveMutation = useMutation({
        mutationFn: (d) => form?.id ? adminUpdateRental(form.id, d) : adminCreateRental(d),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-rentals'] }); toast.success('Rental disimpan!'); setForm(null); },
        onError: () => toast.error('Gagal menyimpan'),
    });

    const deleteMutation = useMutation({
        mutationFn: adminDeleteRental,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-rentals'] }); toast.success('Rental dihapus'); },
        onError: () => toast.error('Gagal menghapus'),
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await uploadImage(file, 'rentals');
            setForm(f => ({ ...f, images: [...(f.images ?? []), res.path] }));
            toast.success('Gambar diupload!');
        } catch { toast.error('Upload gagal'); } finally { setUploading(false); }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 className="admin__page-title" style={{ margin: 0 }}>Rental</h1>
                <button className="btn btn-primary" onClick={() => setForm(EMPTY)}>+ Tambah</button>
            </div>

            {form && (
                <div className="admin__card" style={{ marginBottom: 24 }}>
                    <h3 style={{ marginBottom: 16 }}>{form.id ? 'Edit Rental' : 'Tambah Rental'}</h3>
                    <div className="admin__form">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <label>Nama<input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></label>
                            <label>Status
                                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                                    <option value="available">Available</option>
                                    <option value="rented">Rented</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </label>
                            <label>Harga per Hari<input type="number" value={form.price_per_day} onChange={e => setForm(f => ({ ...f, price_per_day: e.target.value }))} /></label>
                            <label>Tampilan Harga<input value={form.price_display ?? ''} onChange={e => setForm(f => ({ ...f, price_display: e.target.value }))} /></label>
                        </div>
                        <label>Deskripsi<textarea value={form.description ?? ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></label>
                        <label>Pesan WhatsApp Custom<textarea value={form.whatsapp_text ?? ''} onChange={e => setForm(f => ({ ...f, whatsapp_text: e.target.value }))} rows={2} style={{ borderColor: '#D4AF37', borderWidth: 2 }} /></label>
                        <div>
                            <label style={{ marginBottom: 8, display: 'block' }}>Foto</label>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {(form.images ?? []).map((img, i) => (
                                    <div key={i} style={{ position: 'relative' }}>
                                        <img src={img} alt="" style={{ width: 72, height: 72, objectFit: 'cover', border: '1px solid #ddd' }} />
                                        <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 12 }}>×</button>
                                    </div>
                                ))}
                                <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: 72, height: 72, border: '2px dashed #D4AF37', background: '#fffdf5', cursor: 'pointer', color: '#D4AF37', fontSize: '0.7rem' }}>{uploading ? '...' : '+ Upload'}</button>
                                <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-primary" onClick={() => saveMutation.mutate({ ...form, price_per_day: parseInt(form.price_per_day) || 0 })} disabled={saveMutation.isPending}>Simpan</button>
                            <button className="btn btn-secondary" onClick={() => setForm(null)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="admin__card">
                <div className="admin__table-wrap">
                    <table className="admin__table">
                        <thead><tr><th>Foto</th><th>Nama</th><th>Harga/Hari</th><th>Status</th><th>Aksi</th></tr></thead>
                        <tbody>
                            {isLoading ? <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40 }}>Memuat...</td></tr> :
                                rentals.map(r => (
                                    <tr key={r.id}>
                                        <td>{r.images?.[0] ? <img src={r.images[0]} style={{ width: 48, height: 48, objectFit: 'cover' }} alt="" /> : <div style={{ width: 48, height: 48, background: '#eee' }} />}</td>
                                        <td style={{ fontWeight: 500 }}>{r.name}</td>
                                        <td>{r.price_display}</td>
                                        <td><span className={`admin__badge ${r.status === 'available' ? 'admin__badge--green' : 'admin__badge--red'}`}>{r.status}</span></td>
                                        <td>
                                            <button className="admin__action-btn" onClick={() => setForm({ ...r, images: r.images ?? [] })}>Edit</button>
                                            <button className="admin__action-btn admin__action-btn--danger" onClick={() => { if (confirm('Hapus?')) deleteMutation.mutate(r.id); }}>Hapus</button>
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
