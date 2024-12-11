import type {AuthProvider} from "@refinedev/core";
import {login} from "../api/auth";

export const TOKEN_KEY = "refine-auth";

const authProvider: AuthProvider = {
  login: async ({username, email, password}) => {

    if ((username || email) && password) {
      const result = await login({
        username,
        password
      })
      localStorage.setItem(TOKEN_KEY, result.token);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return {error};
  },
};

export {authProvider}