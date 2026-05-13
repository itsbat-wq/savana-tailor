import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminMe, adminLogin, adminLogout, getToken, clearToken } from '@/lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      /** Verify the stored token is still valid */
      checkAuth: async () => {
        // If there's no token at all, no point calling the API
        const token = getToken();
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }
        if (get().isLoading) return;
        set({ isLoading: true });
        try {
          const res = await adminMe();
          const user = res.user ?? res.data ?? res;
          set({ user, isAuthenticated: true });
        } catch {
          clearToken();
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (credentials) => {
        const res = await adminLogin(credentials);
        const user = res.user ?? res.data ?? res;
        set({ user, isAuthenticated: true });
        return user;
      },

      logout: async () => {
        await adminLogout();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'savana-admin-auth',
      // Only persist user info — token lives in localStorage separately
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
