import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuthStore from '../../stores/authStore';

const LOGO = '/Logo/ChatGPT Image May 13, 2026, 05_21_18 PM.png';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login({ email, password });
            toast.success('Login berhasil!');
            navigate('/admin');
        } catch (err) {
            const msg = err.response?.data?.errors?.email?.[0] ?? err.response?.data?.message ?? 'Login gagal';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #111 0%, #1a0608 100%)', padding: 24 }}>
            <div style={{ width: '100%', maxWidth: 420, background: '#fff', padding: '48px 40px', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <img src={LOGO} alt="ST" style={{ height: 60, width: 60, borderRadius: '50%', objectFit: 'contain', margin: '0 auto 12px' }} />
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-maroon)' }}>Admin Panel</h1>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(17,17,17,0.5)', marginTop: 4 }}>Savana Taylor Boutique</p>
                </div>
                <form onSubmit={handleSubmit} className="admin__form">
                    <label>
                        Email
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@savanataylor.com" autoComplete="email" />
                    </label>
                    <label>
                        Password
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" autoComplete="current-password" />
                    </label>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
                        {loading ? 'Masuk...' : 'Masuk'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 24, fontSize: '0.75rem', color: 'rgba(17,17,17,0.4)' }}>
                    <a href="/" style={{ color: 'var(--color-maroon)' }}>&#8592; Kembali ke website</a>
                </p>
            </div>
        </div>
    );
}
