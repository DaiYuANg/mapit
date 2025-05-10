// hooks/useDict.ts
import {useEffect, useState} from 'react'
import {useDictContext} from "./UseDictContext.tsx";
import type {DictItem} from "../context";

export function useDict(project: string, code: string) {
  const {fetchDict} = useDictContext()
  const [data, setData] = useState<DictItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchDict(project, code)
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [project, code, fetchDict])

  return {data, loading, error}
}
