export interface DictionaryItemVo {
  code: string;
  name: string;
  description?: string;
  extra?: any;
}

export interface Project {
  id: string;
  name: string;
}

export * from './dictionary';
