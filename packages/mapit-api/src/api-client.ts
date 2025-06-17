import { DictionaryGroup } from '@mapit/types';

interface ApiClient {
  queryByCodeAndValue(dictCode: string, itemValue: string): Promise<string>;

  dictionaryAll(): Promise<DictionaryGroup>;
}

export type { ApiClient };
