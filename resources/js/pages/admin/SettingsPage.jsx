import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminFetchSettings, adminUpdateSettings } from '../../api/admin';

const GROUPS = [
    { key: 'contact', label: 'Kontak', fields: [
        { key: 'phone', label: 'Nomor HP/WA (tampil)', placeholder: '081317935360' },
        { key: 'whatsapp', label: 'Nomor WA (kode negara)', placeholder: '6281317935360' },
        { key: 'instagram', label: 'Instagram', placeholder: '@savanatailorboutique' },
        { key: 'tiktok', label: 'TikTok', placeholder: '@savanatailorboutique' },
        { key: 'location', label: 'Lokasi', placeholder: 'Jakarta Utara' },
    ]},
    { key: 'hero', label: 'Hero Section', fields: [
        { key: 'hero_title', label: 'Judul Hero', placeholder: 'Crafting Elegance, Defining Excellence' },
        { key: 'hero_subtitle', label: 'Subtitle', placeholder: 'Custom Made • Exclusive • Elegant • Timeless' },
        { key: 'hero_description', label: 'Deskripsi', placeholder: 'Spesialis baju dinas...', type: 'textarea' },
        { key: 'hero_image', label: 'Path Foto Hero', placeholder: '/Foto Produk/IMG_7054.PNG' },
    ]},
    { key: 'stats', label: 'Statistik', fields: [
        { key: 'stat_years', label: 'Tahun (angka)', placeholder: '10+' },
        { key: 'stat_years_label', label: 'Tahun (label)', placeholder: 'Tahun Pengalaman' },
        { key: 'stat_cities', label: 'Kota (angka)', placeholder: '30+' },
        { key: 'stat_cities_label', label: 'Kota (label)', placeholder: 'Kota Dilayani' },
    ]},
];

export default function SettingsPage() {
    const [values, setValues] = useState({});
    const [activeGroup, setActiveGroup] = useState('contact');

    const { data, isLoading } = useQuery({ queryKey: ['admin-settings'], queryFn: adminFetchSettings });

    useEffect(() => {
        if (data?.data) {
            const flat = {};
            Object.values(data.data).forEach(group => Object.assign(flat, group));
            setValues(flat);
        }
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: () => {
            const group = GROUPS.find(g => g.key === activeGroup);
            const settings = group.fields.map(f => ({ key: f.key, value: values[f.key] ?? '', group: activeGroup }));
            return adminUpdateSettings(settings);
        },
        onSuccess: () => toast.success('Settings disimpan!'),
        onError: () => toast.error('Gagal menyimpan'),
    });

    const currentGroup = GROUPS.find(g => g.key === activeGroup);

    return (
        <div>
            <h1 className="admin__page-title">Settings</h1>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <aside style={{ width: 200, flexShrink: 0 }}>
                    {GROUPS.map(g => (
                        <button key={g.key} onClick={() => setActiveGroup(g.key)} className="about-sidebar__btn" style={{ width: '100%', borderLeft: activeGroup === g.key ? '3px solid var(--color-gold)' : '3px solid transparent', background: activeGroup === g.key ? 'var(--color-cream)' : 'transparent', color: activeGroup === g.key ? 'var(--color-maroon)' : 'rgba(17,17,17,0.6)', fontWeight: activeGroup === g.key ? 600 : 400 }}>
                            {g.label}
                        </button>
                    ))}
                </aside>
                <div className="admin__card" style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: 20 }}>{currentGroup?.label}</h3>
                    {isLoading ? <p>Memuat...</p> : (
                        <div className="admin__form">
                            {currentGroup?.fields.map(f => (
                                <label key={f.key}>
                                    {f.label}
                                    {f.type === 'textarea'
                                        ? <textarea value={values[f.key] ?? ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                                        : <input value={values[f.key] ?? ''} onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder} />
                                    }
                                </label>
                            ))}
                            <button className="btn btn-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} style={{ alignSelf: 'flex-start' }}>
                                {saveMutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
