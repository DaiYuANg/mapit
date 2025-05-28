// @ts-ignore
import SnowflakeId from 'snowflake-id';

// 创建一个全局唯一的雪花ID生成器
const snowflake = new SnowflakeId({
  mid: 1, // 机器ID，可自定义
  offset: (2024 - 1970) * 31536000 * 1000 // 可选，时间偏移
});

export const generateId = (): string => {
  return snowflake.generate().toString();
}; 