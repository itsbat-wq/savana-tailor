import { create } from 'zustand';
import { getMe, login as apiLogin, logout as apiLogout } from '../api/admin';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    checkAuth: async () => {
        try {
            const data = await getMe();
            set({ user: data.user, isAuthenticated: true, isLoading: false });
        } catch {
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    login: async (credentials) => {
        const data = await apiLogin(credentials);
        set({ user: data.user, isAuthenticated: true });
        return data;
    },

    logout: async () => {
        await apiLogout();
        set({ user: null, isAuthenticated: false });
    },
}));

export default useAuthStore;
