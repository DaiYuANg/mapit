import type {DictCache} from "./cache.ts";

const createStorageCache = (storage: Storage): DictCache => ({
  get(key) {
    const raw = storage.getItem(key)
    if (!raw) return undefined
    try {
      const {value, expiresAt} = JSON.parse(raw)
      if (expiresAt && Date.now() > expiresAt) {
        storage.removeItem(key)
        return undefined
      }
      return value
    } catch {
      return undefined
    }
  },
  set(key, value) {
    const payload = {
      value,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24小时过期
    }
    storage.setItem(key, JSON.stringify(payload))
  }
});

export {createStorageCache}