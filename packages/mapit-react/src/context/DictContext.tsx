// context/DictContext.tsx
import {createContext} from 'react'
import type {DictCache} from "../cache/cache.ts";

export interface DictItem {
  label: string
  value: string | number
  [key: string]: any
}


export interface DictContextConfig {
  apiBaseUrl?: string
  accessKey?: string
  defaultProject?: string
  extraQueryParams?: Record<string, string>
  storage?: 'memory' | 'local' | 'session' | DictCache
}

interface DictContextValue {
  fetchDict: (project: string, code: string) => Promise<DictItem[]>
  cache: DictCache
  config: DictContextConfig
}

const DictContext = createContext<DictContextValue | null>(null)

export {DictContext}