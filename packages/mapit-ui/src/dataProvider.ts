import { DataProvider } from '@refinedev/core';
import { request } from './api/request';

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
    const url = `/${resource}?page=${current}&pageSize=${pageSize}${filterQuery ? `&${filterQuery}` : ''}`;
    console.log('DataProvider getList - URL:', url);
    console.log('DataProvider getList - Request instance:', request);
    const result: { data: any[]; total: number } = await request.get(url);
    console.log('DataProvider getList - Response:', result);
    return {
      data: result.data,
      total: result.total,
    };
  },
  getOne: async ({ resource, id }) => {
    let url = `/${resource}/${id}`;
    if (resource === 'project') {
      url = `/project/detail/${id}`;
    }
    const result = await request.get(url);
    return { data: result.data };
  },
  create: async ({ resource, variables }) => {
    const url = `/${resource}`;
    const result = await request.post(url, variables);
    return { data: result.data };
  },
  update: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}`;
    const result = await request.patch(url, variables);
    return { data: result.data };
  },
  deleteOne: async ({ resource, id }) => {
    const url = `/${resource}/${id}`;
    const result = await request.delete(url, { data: { id } });
    return { data: result.data };
  },
  getApiUrl: () => apiUrl,
  custom: async ({ url, method, payload, query, headers }) => {
    const result = await request({
      url,
      method,
      headers,
      data: payload,
      params: query,
    });
    return { data: result.data };
  },
});
