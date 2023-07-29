export type NoContent = {
  delete: string;
};

enum OrderType {
  Desc = "desc",
  Asc = "asc",
}

export interface QueryParams {
  sort?: OrderType;
}
