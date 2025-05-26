import { DataProvider, GetListParams } from "@refinedev/core";

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
  // 其他方法可以按需补充
} as any;