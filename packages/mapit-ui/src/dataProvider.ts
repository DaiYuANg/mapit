import { DataProvider } from "@refinedev/core";

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    const url = `${apiUrl}/${resource}?page=${current}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      data: result.data,
      total: result.total,
    };
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return { data: result };
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return { data: result };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return { data: result };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await fetch(url, { method: "DELETE" });
    const result = await response.json();
    return { data: result };
  },
  getApiUrl: () => apiUrl,
  custom: async ({ url, method, payload, query, headers }) => {
    const response = await fetch(url, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const result = await response.json();
    return { data: result };
  },
});
