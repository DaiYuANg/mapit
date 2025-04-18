import {axiosInstance, generateSort, generateFilter} from "./utils";
import {stringify} from "query-string";
import type {AxiosInstance} from "axios";
import type {DataProvider} from "@refinedev/core";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({resource, pagination, filters, sorters, meta}) => {
    const url = `${apiUrl}/${resource}`;
    console.log('get list')
    const {current = 1, pageSize = 10, mode = "server"} = pagination ?? {};

    const {headers: headersFromMeta, method} = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const queryFilters = generateFilter(filters);

    const query: {
      _start?: number;
      _end?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query._start = (current - 1) * pageSize;
      query._end = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const {_sort, _order} = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const combinedQuery = {...query, ...queryFilters};
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    const {data: responseData, headers} = await httpClient[requestMethod](urlWithQuery, {
      headers: headersFromMeta,
    });
    // const total = +headers["x-total-count"];
    console.log("resp data", responseData)
    return {
      data: responseData.data,
      total: responseData.total
    };
  },

  getMany: async ({resource, ids, meta}) => {
    const {headers, method} = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const {data} = await httpClient[requestMethod](
      `${apiUrl}/${resource}?${stringify({id: ids})}`,
      {headers}
    );
    console.log('get many')
    return {
      data,
    };
  },

  create: async ({resource, variables, meta}) => {
    const url = `${apiUrl}/${resource}`;

    const {headers, method} = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const {data} = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  update: async ({resource, id, variables, meta}) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const {headers, method} = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const {data} = await httpClient[requestMethod](url, variables, {
      headers,
    });

    return {
      data,
    };
  },

  getOne: async ({resource, id, meta}) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const {headers, method} = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const {data} = await httpClient[requestMethod](url, {headers});

    return {
      data,
    };
  },

  deleteOne: async ({resource, id, variables, meta}) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const {headers, method} = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const {data} = await httpClient[requestMethod](url, {
      data: variables,
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
                   url,
                   method,
                   filters,
                   sorters,
                   payload,
                   query,
                   headers,
                 }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const {_sort, _order} = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          headers,
        });
        break;
    }

    const {data} = axiosResponse;

    return Promise.resolve({data});
  },
});
