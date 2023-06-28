export interface SubjectsCreateResponse {
  id: number;
  title: string;
  description: string;
}

export type SubjectCreateRequest = Omit<SubjectsCreateResponse, "id">;
