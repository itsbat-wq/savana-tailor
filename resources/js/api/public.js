import api from './axios';

export const fetchProducts = async (params = {}) => {
    const { data } = await api.get('/v1/products', { params });
    return data;
};

export const fetchFeaturedProducts = async () => {
    const { data } = await api.get('/v1/products/featured');
    return data;
};

export const fetchProduct = async (slug) => {
    const { data } = await api.get(`/v1/products/${slug}`);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await api.get('/v1/categories');
    return data;
};

export const fetchCategory = async (slug) => {
    const { data } = await api.get(`/v1/categories/${slug}`);
    return data;
};

export const fetchRentals = async () => {
    const { data } = await api.get('/v1/rentals');
    return data;
};

export const fetchSettings = async () => {
    const { data } = await api.get('/v1/settings');
    return data;
};
