// @ts-expect-error - snowflake-id module lacks TypeScript type definitions
import SnowflakeId from 'snowflake-id';

// 创建一个全局唯一的雪花ID生成器
const snowflake = new SnowflakeId({
  mid: 1,
  offset: (2024 - 1970) * 31536000 * 1000,
});

export const generateId = (): string => {
  return String(snowflake.generate());
};
