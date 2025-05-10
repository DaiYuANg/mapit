import {type FC, useEffect, useState} from "react";
import {type DictItem} from "../context";
import {useDictContext} from "../hook";

interface DictItemRendererProps {
  dictCode: string;
  value: string | number;
}

export const DictItemRenderer: FC<DictItemRendererProps> = ({dictCode, value}) => {
  const {fetchDict} = useDictContext();
  const [dictItem, setDictItem] = useState<DictItem | null>(null);

  // 获取字典项
  useEffect(() => {
    const loadDictItem = async () => {
      try {
        // 假设 fetchDict 返回的是一个字典项数组
        const dictItems = await fetchDict('default_project', dictCode);
        const item = dictItems.find((i: DictItem) => i.value === value);
        setDictItem(item || null); // 找到对应的字典项
      } catch (error) {
        console.error("Failed to load dictionary item:", error);
      }
    };

    loadDictItem();
  }, [dictCode, value, fetchDict]);

  if (!dictItem) {
    return <span>Loading...</span>; // 加载时显示 Loading
  }

  return <span>{dictItem.label}</span>; // 渲染字典项标签
};