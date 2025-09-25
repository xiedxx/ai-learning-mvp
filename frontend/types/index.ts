export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
