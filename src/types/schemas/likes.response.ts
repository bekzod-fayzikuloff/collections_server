export interface LikeCreateRequest {
  userId: string;
  itemId: number;
}

export type LikeResponse = LikeCreateRequest & {
  id: number;
  createdAt: string;
  updatedAt: string;
};
