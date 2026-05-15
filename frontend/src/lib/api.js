import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
export const STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000';

const TOKEN_KEY = 'savana_admin_token';

// Token helpers (safe for SSR — check typeof window)
export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null);
export const setToken = (t) => { if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, t); };
export const clearToken = () => { if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY); };

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000,
});

// Attach Bearer token on every request if available
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

/**
 * Normalize Laravel response: both paginated {data, meta, links}
 * and simple {data: [...]} collapse to { data: [...], meta }
 */
function normalize(response) {
  const body = response.data;

  // Paginated: { data: [], meta: {}, links: {} }
  if (body && Array.isArray(body.data) && body.meta) {
    return { data: body.data, meta: body.meta };
  }

  // Collection: { data: [] }
  if (body && Array.isArray(body.data)) {
    return { data: body.data };
  }

  // Single resource: { data: {} }
  if (body && body.data && !Array.isArray(body.data)) {
    return body;   // pass through as-is (product detail has {data, related})
  }

  return body;
}

// ─── Public API ───────────────────────────────────
export const getProducts = (params = {}) =>
  api.get('/v1/products', { params }).then(normalize);

export const getFeatured = () =>
  api.get('/v1/products/featured').then(normalize);

export const getProduct = (slug) =>
  api.get(`/v1/products/${slug}`).then(r => r.data);

export const getCategories = () =>
  api.get('/v1/categories').then(normalize);

export const getCategory = (slug) =>
  api.get(`/v1/categories/${slug}`).then(normalize);

export const getRentals = () =>
  api.get('/v1/rentals').then(normalize);

export const getSettings = () =>
  api.get('/v1/settings').then(r => r.data);

// ─── Admin Auth ───────────────────────────────────
export async function adminLogin(credentials) {
  // Token-based: just POST directly — no CSRF cookie needed
  const res = await api.post('/admin/login', credentials);
  const { token, user } = res.data;
  if (token) setToken(token);
  return res.data;
}

export async function adminLogout() {
  try { await api.post('/admin/logout'); } catch { /* ignore */ }
  clearToken();
}

export const adminMe = () => api.get('/admin/me').then(r => r.data);

// ─── Admin CRUD ───────────────────────────────────
export const adminDashboard = () => api.get('/admin/dashboard').then(r => r.data);

// Products
export const adminGetProducts = (params = {}) => api.get('/admin/products', { params }).then(normalize);
export const adminCreateProduct = (data) => api.post('/admin/products', data).then(r => r.data);
export const adminUpdateProduct = (id, data) => api.put(`/admin/products/${id}`, data).then(r => r.data);
export const adminDeleteProduct = (id) => api.delete(`/admin/products/${id}`).then(r => r.data);

// Categories
export const adminGetCategories = (params = {}) => api.get('/admin/categories', { params }).then(normalize);
export const adminCreateCategory = (data) => api.post('/admin/categories', data).then(r => r.data);
export const adminUpdateCategory = (id, data) => api.put(`/admin/categories/${id}`, data).then(r => r.data);
export const adminDeleteCategory = (id) => api.delete(`/admin/categories/${id}`).then(r => r.data);

// Rentals
export const adminGetRentals = (params = {}) => api.get('/admin/rentals', { params }).then(normalize);
export const adminCreateRental = (data) => api.post('/admin/rentals', data).then(r => r.data);
export const adminUpdateRental = (id, data) => api.put(`/admin/rentals/${id}`, data).then(r => r.data);
export const adminDeleteRental = (id) => api.delete(`/admin/rentals/${id}`).then(r => r.data);

// Settings
export const adminGetSettings = () => api.get('/admin/settings').then(r => r.data);
export const adminUpdateSettings = (settings) => api.put('/admin/settings', { settings }).then(r => r.data);

// Media upload
export const adminUploadImage = async (file, folder = 'products') => {
  const form = new FormData();
  form.append('image', file);
  form.append('folder', folder);
  const res = await api.post('/admin/media/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export default api;
