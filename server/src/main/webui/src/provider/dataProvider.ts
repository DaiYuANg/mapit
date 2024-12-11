import { DataProvider } from "@refinedev/core";
import { req } from "../api/req";
import dataProvider from "@refinedev/simple-rest";

export const MapitDataProvider = (url: string): DataProvider => {
  const defaultProvider = dataProvider(url);

  return {
    getList: async ({ resource, meta, pagination }) => {
      console.log(meta);
      const queryParam = {
        current: pagination?.current,
        pageSize: pagination?.pageSize,
      };
      const response = await req.get(resource, { params: queryParam });
      console.log(response);
      const data = response.data ? response.data : [];

      return {
        data,
        total: data.length,
      };
    },

    getOne: async (params) => {
      return defaultProvider.getOne(params);
    },

    create: async (params) => {
      return req.post(params.resource, params.variables);
    },
    update: async (params) => {
      return defaultProvider.update(params);
    },
    deleteOne: async (params) => {
      return defaultProvider.deleteOne(params);
    },
    getMany: async (params) => {
      console.log(params);
      return req.get(params.resource);
    },

    getApiUrl: () => url,
  };
};
