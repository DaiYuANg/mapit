type Result<T> = {
  code: string;
  status: string;
  data: T;
};

type Paged<T> = {
  data: T[];
  total: number;
};
export type { Paged, Result };
