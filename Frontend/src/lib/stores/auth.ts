import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { apiClient } from '../api/client';

export interface User {
  email: string;
  id: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    token: browser ? localStorage.getItem('token') : null,
    isAuthenticated: browser ? !!localStorage.getItem('token') : false,
  };

  const { subscribe, set } = writable<AuthState>(initialState);

  return {
    subscribe,
    login: (token: string, user: User) => {
      if (browser) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      set({ user, token, isAuthenticated: true });
    },
    register: (token: string, user: User) => {
      // Register is same as login - set auth state
      if (browser) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      if (browser) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      set({ user: null, token: null, isAuthenticated: false });
    },
    checkAuth: () => {
      if (browser) {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({ user, token, isAuthenticated: true });
          } catch (error) {
            console.error('Failed to parse user data:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      }
    },
  };
}

export const authStore = createAuthStore();