export interface CommentRequest {
  userId: string;
  itemId: number;
  text: string;
}

export type CommentResponse = CommentRequest & {
  id: number;
  createdAt: string;
  updatedAt: string;
};
