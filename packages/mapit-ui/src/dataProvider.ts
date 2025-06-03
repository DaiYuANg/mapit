import { DataProvider } from '@refinedev/core';

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, filters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    // 处理 filters
    let filterQuery = '';
    if (filters && filters.length > 0) {
      filterQuery = filters
        .filter((filter: any) => filter.field)
        .map((filter: any) => `${encodeURIComponent(filter.field)}=${encodeURIComponent(filter.value)}`)
        .join('&');
    }
    const url = `${apiUrl}/${resource}?page=${current}&pageSize=${pageSize}${filterQuery ? `&${filterQuery}` : ''}`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      data: Array.isArray(result) ? result : result.data,
      total: Array.isArray(result) ? result.length : result.total,
    };
  },
  getOne: async ({ resource, id }) => {
    let url = `${apiUrl}/${resource}/${id}`;
    if (resource === 'project') {
      url = `${apiUrl}/project/detail/${id}`;
    }
    const response = await fetch(url);
    const result = await response.json();
    return { data: result };
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return { data: result };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return { data: result };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
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
