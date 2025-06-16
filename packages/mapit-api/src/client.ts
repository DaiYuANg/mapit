import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiClientOptions {
  baseURL: string;
  accessKey: string;
  accessSecret: string;
  projectId: string;
}

export class ApiClient {
  private instance: AxiosInstance;

  constructor(private options: ApiClientOptions) {
    this.instance = axios.create({
      baseURL: this.options.baseURL,
      headers: {
        'X-Access-Key': this.options.accessKey,
        'X-Access-Secret': this.options.accessSecret,
        'X-Project-Id': this.options.projectId,
      },
    });

    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  }

  private get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public mappingByValue(dictCode: string, itemValue: string) {
    const url = `/api/v1/dictionaries/${dictCode}/mapping/${itemValue}`;
    return this.get(url);
  }

  public dictionaryAll() {
    return this.get(`/api/v1/dictionaries/all`);
  }
}
