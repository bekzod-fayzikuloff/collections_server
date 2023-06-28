export interface CollectionsCreateResponse {
  id: number;
  title: string;
  description: string;
  image: string | null;
  customFields: string;
  subjectId: number | null;
  userId: number;
}
export type CollectionsCreateRequest = Omit<CollectionsCreateResponse, "id" | "image">;
