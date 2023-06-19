export type NoContent = {
  delete: string;
};

enum OrderE {
  Desc = "desc",
  Asc = "asc",
}

export interface QueryParams {
  sort?: OrderE;
}
