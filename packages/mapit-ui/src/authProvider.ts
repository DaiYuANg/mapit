import type { AuthProvider } from '@refinedev/core';
import { loginApi } from './api/auth';

export const TOKEN_KEY = 'refine-auth';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const res = await loginApi(username, password);
      console.log('Login response:', res);
      localStorage.setItem(TOKEN_KEY, res.data.token);
      console.log('Token stored:', localStorage.getItem(TOKEN_KEY));
      return {
        success: true,
        redirectTo: '/',
        code: res.code,
        message: res.message,
      };
    } catch (res: any) {
      console.error('Login error:', res);
      return {
        success: false,
        error: {
          name: 'Login Error',
          message: res?.response?.data?.message || res?.message || '登录失败了',
        },
      };
    }
  },
  logout: async () => {
    console.log('Logging out, removing token');
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Auth check - token:', token);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Getting identity - token:', token);
    if (token) {
      return {
        id: 1,
        name: '管理员',
        avatar: 'https://i.pravatar.cc/300',
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error('Auth error:', error);
    return { error };
  },
};
