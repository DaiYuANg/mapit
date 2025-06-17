export interface DictionaryItemView {
  code: string;
  name: string;
  description?: string | null;
  extra: Record<string, string | number | object | any> | undefined | null;
}

export type DictionaryItemSelectView = Pick<DictionaryItemView, 'description' | 'extra'> & {
  value: DictionaryItemView['code'];
  label: DictionaryItemView['name'];
};

export type DictionaryGroup = Record<string, DictionaryItemView[]>;
