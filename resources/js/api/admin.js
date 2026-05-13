import api, { getCsrfCookie } from './axios';

// ===== AUTH =====
export const login = async (credentials) => {
    await getCsrfCookie();
    const { data } = await api.post('/admin/login', credentials);
    return data;
};

export const logout = async () => {
    const { data } = await api.post('/admin/logout');
    return data;
};

export const getMe = async () => {
    const { data } = await api.get('/admin/me');
    return data;
};

// ===== DASHBOARD =====
export const fetchDashboard = async () => {
    const { data } = await api.get('/admin/dashboard');
    return data;
};

// ===== PRODUCTS =====
export const adminFetchProducts = async (params = {}) => {
    const { data } = await api.get('/admin/products', { params });
    return data;
};

export const adminCreateProduct = async (product) => {
    const { data } = await api.post('/admin/products', product);
    return data;
};

export const adminUpdateProduct = async (id, product) => {
    const { data } = await api.put(`/admin/products/${id}`, product);
    return data;
};

export const adminDeleteProduct = async (id) => {
    const { data } = await api.delete(`/admin/products/${id}`);
    return data;
};

export const adminReorderProducts = async (items) => {
    const { data } = await api.patch('/admin/products-reorder', { items });
    return data;
};

// ===== CATEGORIES =====
export const adminFetchCategories = async () => {
    const { data } = await api.get('/admin/categories');
    return data;
};

export const adminCreateCategory = async (category) => {
    const { data } = await api.post('/admin/categories', category);
    return data;
};

export const adminUpdateCategory = async (id, category) => {
    const { data } = await api.put(`/admin/categories/${id}`, category);
    return data;
};

export const adminDeleteCategory = async (id) => {
    const { data } = await api.delete(`/admin/categories/${id}`);
    return data;
};

// ===== RENTALS =====
export const adminFetchRentals = async () => {
    const { data } = await api.get('/admin/rentals');
    return data;
};

export const adminCreateRental = async (rental) => {
    const { data } = await api.post('/admin/rentals', rental);
    return data;
};

export const adminUpdateRental = async (id, rental) => {
    const { data } = await api.put(`/admin/rentals/${id}`, rental);
    return data;
};

export const adminDeleteRental = async (id) => {
    const { data } = await api.delete(`/admin/rentals/${id}`);
    return data;
};

// ===== SETTINGS =====
export const adminFetchSettings = async () => {
    const { data } = await api.get('/admin/settings');
    return data;
};

export const adminUpdateSettings = async (settings) => {
    const { data } = await api.put('/admin/settings', { settings });
    return data;
};

// ===== MEDIA =====
export const uploadImage = async (file, folder = 'products') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    const { data } = await api.post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const deleteImage = async (filename) => {
    const { data } = await api.delete(`/admin/media/${filename}`);
    return data;
};
