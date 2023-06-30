export interface ItemCreateRequest {
  id: number;
  title: string;
  customFields: string;
  collectionId: number;
}

export type ItemListResponse = ItemCreateRequest & {
  createdAt: string;
  updatedAt: string;
};

export type ItemDetailResponse = ItemListResponse & {
  tags: any[];
  likes: any[];
  comments: any[];
  collection: null | object;
};
