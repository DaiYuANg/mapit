import {useContext} from "react";
import {DictContext} from "../context";

export const useDictContext = () => {
  const ctx = useContext(DictContext)
  if (!ctx) throw new Error('DictContext not found')
  return ctx
}