'use client';
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Upload, X } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { adminCreateRental, adminUploadImage, STORAGE } from '@/lib/api';
import styles from '../rentals.module.css';

const formStyles = {
  container: { background: '#fff', padding: '32px', border: '1px solid #e5e7eb' },
  field: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  select: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff', transition: 'border-color 0.2s' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  dropzone: { border: '2px dashed #e5e7eb', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: '#fafafa' },
  dropzoneActive: { borderColor: '#C9A84C', background: '#fffbf0' },
  previewWrap: { marginTop: '12px', position: 'relative', display: 'inline-block' },
  previewItem: { position: 'relative', width: '120px', height: '120px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  removeBtn: { position: 'absolute', top: '4px', right: '4px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
};

export default function CreateRentalPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    status: 'available',
  });
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => adminCreateRental(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-rentals'] });
      toast.success('Rental berhasil ditambahkan');
      router.push('/admin/rentals');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Gagal menambahkan rental');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = useCallback(async (file) => {
    setUploading(true);
    try {
      const res = await adminUploadImage(file, 'rentals');
      setImage(res.url);
    } catch {
      toast.error('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  const removeImage = () => {
    setImage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Nama rental wajib diisi'); return; }
    if (!form.price) { toast.error('Harga wajib diisi'); return; }

    mutation.mutate({
      ...form,
      price_per_day: Number(form.price),
      images: image ? [image] : [],
    });
  };

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Tambah Rental</h1>
            <p className={styles.sub}>Tambahkan item rental baru</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formStyles.container}>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama item rental"
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
              placeholder="Deskripsi item rental..."
              style={formStyles.textarea}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={formStyles.row}>
            <div style={formStyles.field}>
              <label style={formStyles.label}>Harga (Rp)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                style={formStyles.input}
                onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            <div style={formStyles.field}>
              <label style={formStyles.label}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={formStyles.select}
                onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
              </select>
            </div>
          </div>

          {/* Image Upload - Single */}
          <div style={formStyles.field}>
            <label style={formStyles.label}>Gambar</label>
            <div
              style={{ ...formStyles.dropzone, ...(dragOver ? formStyles.dropzoneActive : {}) }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('rental-image').click()}
            >
              <Upload size={32} color="#9e9e9e" style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>
                {uploading ? 'Mengupload...' : 'Drag & drop gambar atau klik untuk memilih'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9e9e9e' }}>
                Satu gambar (JPG, PNG)
              </p>
              <input
                id="rental-image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            {image && (
              <div style={formStyles.previewWrap}>
                <div style={formStyles.previewItem}>
                  <img src={image.startsWith('http') || image.startsWith('blob') ? image : `${STORAGE}${image}`} alt="Preview" style={formStyles.previewImg} />
                  <button type="button" onClick={removeImage} style={formStyles.removeBtn}>
                    <X size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.addBtn}
            disabled={mutation.isPending || uploading}
            style={{ marginTop: '8px', opacity: (mutation.isPending || uploading) ? 0.6 : 1 }}
          >
            {mutation.isPending ? 'Menyimpan...' : 'Simpan Rental'}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
