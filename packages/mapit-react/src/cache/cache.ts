import type {DictItem} from "../context";

export interface DictCache {
  get(key: string): DictItem[] | undefined
  set(key: string, value: DictItem[]): void
  clear?(): void
}