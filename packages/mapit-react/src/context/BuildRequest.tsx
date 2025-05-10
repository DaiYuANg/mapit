import type {DictContextConfig} from "./DictContext.tsx";

export const buildRequest = (config: DictContextConfig, project: string, code: string): RequestInit & {
  url: string
} => {
  const url = new URL(`${config.apiBaseUrl ?? '/api'}/dictionary/${project}/${code}`)
  for (const [k, v] of Object.entries(config.extraQueryParams ?? {})) {
    url.searchParams.append(k, v)
  }
  const headers: Record<string, string> = {}
  if (config.accessKey) headers.Authorization = `Bearer ${config.accessKey}`
  return {url: url.toString(), headers}
};