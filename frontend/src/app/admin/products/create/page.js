'use client';
import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { adminCreateProduct, adminGetCategories, adminUploadImage, STORAGE } from '@/lib/api';
import styles from '../products.module.css';

const formStyles = {
  container: { background: '#fff', padding: '32px', border: '1px solid #e5e7eb' },
  field: { marginBottom: '20px' },
  label: { display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  select: { width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', background: '#fff', transition: 'border-color 0.2s' },
  checkboxWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  checkbox: { width: '16px', height: '16px', accentColor: '#C9A84C' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  dropzone: { borderWidth: '2px', borderStyle: 'dashed', borderColor: '#e5e7eb', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: '#fafafa' },
  dropzoneActive: { borderColor: '#C9A84C', background: '#fffbf0' },
  previewGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginTop: '12px' },
  previewItem: { position: 'relative', width: '150px', height: '150px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  removeBtn: { position: 'absolute', top: '4px', right: '4px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
};

export default function CreateProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    category_id: '',
    price: '',
    description: '',
    status: 'active',
    is_featured: false,
    type: '',
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { data: categoriesData } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminGetCategories(),
  });
  const categories = categoriesData?.data || [];

  const mutation = useMutation({
    mutationFn: (data) => adminCreateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Produk berhasil ditambahkan');
      router.push('/admin/products');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Gagal menambahkan produk');
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleUpload = useCallback(async (files) => {
    setUploading(true);
    try {
      for (const file of files) {
        const res = await adminUploadImage(file, 'products');
        setImages((prev) => [...prev, res.url]);
      }
    } catch {
      toast.error('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) handleUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) handleUpload(files);
  };

  const removeImage = (index) => {
    if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Nama produk wajib diisi'); return; }
    if (!form.price) { toast.error('Harga wajib diisi'); return; }

    mutation.mutate({
      ...form,
      price: Number(form.price),
      category_id: form.category_id ? Number(form.category_id) : null,
      is_featured: form.is_featured ? 1 : 0,
      images,
    });
  };

  return (
    <AdminShell>
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Tambah Produk</h1>
            <p className={styles.sub}>Buat produk baru untuk katalog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formStyles.container}>
          <div style={formStyles.field}>
            <label style={formStyles.label}>Nama Produk</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              style={formStyles.input}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={formStyles.row}>
            <div style={formStyles.field}>
              <label style={formStyles.label}>Kategori</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                style={formStyles.select}
                onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

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
          </div>

          <div style={formStyles.field}>
            <label style={formStyles.label}>Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi produk..."
              style={formStyles.textarea}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={formStyles.field}>
            <label style={formStyles.label}>Tipe/Sub-kategori</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="PDL, PDH, PDU, PDUB, dll"
              style={formStyles.input}
              onFocus={(e) => (e.target.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div style={formStyles.row}>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={{ ...formStyles.field, display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>
              <div style={formStyles.checkboxWrap}>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  id="is_featured"
                  style={formStyles.checkbox}
                />
                <label htmlFor="is_featured" style={{ ...formStyles.label, margin: 0 }}>Produk Unggulan</label>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div style={formStyles.field}>
            <label style={formStyles.label}>Gambar Produk</label>
            <div
              style={{ ...formStyles.dropzone, ...(dragOver ? formStyles.dropzoneActive : {}) }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('product-images').click()}
            >
              <Upload size={32} color="#9e9e9e" style={{ marginBottom: '8px' }} />
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280' }}>
                {uploading ? 'Mengupload...' : 'Drag & drop gambar atau klik untuk memilih'}
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#9e9e9e' }}>
                Mendukung beberapa gambar (JPG, PNG)
              </p>
              <input
                id="product-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            {images.length > 0 && (
              <div style={formStyles.previewGrid}>
                {images.map((url, idx) => (
                  <div key={idx} style={formStyles.previewItem}>
                    <img src={url.startsWith('http') || url.startsWith('blob') ? url : `${STORAGE}${url}`} alt={`Preview ${idx + 1}`} style={formStyles.previewImg} />
                    <button type="button" onClick={() => removeImage(idx)} style={formStyles.removeBtn}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.addBtn}
            disabled={mutation.isPending || uploading}
            style={{ marginTop: '8px', opacity: (mutation.isPending || uploading) ? 0.6 : 1 }}
          >
            {mutation.isPending ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
