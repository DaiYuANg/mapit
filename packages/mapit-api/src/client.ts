import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiClientOptions {
  baseURL: string;
  accessKey: string;
  projectId: string;
}

export class ApiClient {
  private instance: AxiosInstance;

  constructor(private options: ApiClientOptions) {
    this.instance = axios.create({
      baseURL: options.baseURL,
    });

    this.instance.interceptors.request.use((config) => {
      config.headers['Access-Key'] = this.options.accessKey;
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  mapping(dictCode: string, itemValue: string) {
    return this.instance.get(`/api/v1/projects/${this.options.projectId}/dictionaries/${dictCode}/mapping`, {
      params: {
        value: itemValue,
      },
    });
  }
}
