import { Optional, Model } from "sequelize";

export interface CollectionAttributes {
  id: number;
  title: string;
  description: string;
  subjectId?: number;
  userId?: number;
  image?: string;
  customFields?: string;
}

export type CollectionCreatingAttributes = Optional<CollectionAttributes, "id" | "subjectId" | "image">;

export interface CollectionInstance
  extends Model<CollectionAttributes, CollectionCreatingAttributes>,
    CollectionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
