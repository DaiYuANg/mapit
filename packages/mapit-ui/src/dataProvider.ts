import { DataProvider, GetListParams, CreateParams, GetOneParams, UpdateParams, DeleteOneParams } from "@refinedev/core";

export const customDataProvider: DataProvider = {
  getList: async ({ resource, pagination }: GetListParams) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};
    const url = `/api/v1/${resource}/paginated?page=${current}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      data: result.data,
      total: result.total,
    };
  },
  create: async ({ resource, variables }: CreateParams) => {
    const url = `/api/v1/${resource}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return {
      data: result,
    };
  },
  getOne: async ({ resource, id }: GetOneParams) => {
    const url = `/api/v1/${resource}/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return {
      data: result,
    };
  },
  update: async ({ resource, id, variables }: UpdateParams) => {
    const url = `/api/v1/${resource}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(variables),
    });
    const result = await response.json();
    return {
      data: result,
    };
  },
  deleteOne: async ({ resource, id }: DeleteOneParams) => {
    const url = `/api/v1/${resource}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const result = await response.json();
    return {
      data: result,
    };
  },
  // 其他方法可以按需补充
} as any;