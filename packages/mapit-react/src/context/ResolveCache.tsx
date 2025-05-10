import type {DictContextConfig} from "./DictContext.tsx";
import type {DictCache} from "../cache/cache.ts";
import {MemoryCache} from "../cache/MemoryCache.ts";
import {createStorageCache} from "../cache/StorageCache.ts";

export const resolveCache = (storageType?: DictContextConfig['storage']): DictCache => {
  if (!storageType || storageType === 'memory') return new MemoryCache()
  if (storageType === 'local') return createStorageCache(localStorage)
  if (storageType === 'session') return createStorageCache(sessionStorage)
  return storageType
};