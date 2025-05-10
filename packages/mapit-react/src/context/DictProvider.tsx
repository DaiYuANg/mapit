import React, {useCallback, useMemo} from "react";
import {DictContext, type DictContextConfig} from "./DictContext.tsx";
import {buildRequest} from "./BuildRequest.tsx";
import {resolveCache} from "./ResolveCache.tsx";

export const DictProvider: React.FC<{ config: DictContextConfig; children: React.ReactNode }> =
  ({
     config,
     children
   }) => {
    const cache = useMemo(() => resolveCache(config.storage), [config.storage])
    const fetchDict = useCallback(async (project: string, code: string) => {
      const key = `${project}:${code}`
      const cached = cache.get(key)
      if (cached) return cached

      const {url, ...init} = buildRequest(config, project, code)
      const res = await fetch(url, init)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      cache.set(key, data)
      return data
    }, [config, cache])

    return (
      <DictContext.Provider value={{fetchDict, cache, config}}>
        {children}
      </DictContext.Provider>
    )
  }