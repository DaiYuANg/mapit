import type {DictCache} from "./cache.ts";
import type {DictItem} from "../context";

class MemoryCache implements DictCache {
  private cache = new Map<string, DictItem[]>()

  get(key: string) {
    return this.cache.get(key)
  }

  set(key: string, value: DictItem[]) {
    this.cache.set(key, value)
  }
}

export {MemoryCache}