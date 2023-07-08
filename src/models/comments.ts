import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { User } from "./users";

export const Comment = sequelize.define("comment", {
  id: {
    field: "commentId",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    field: "commentText",
    type: DataTypes.TEXT,
  },
});

Comment.belongsTo(User);
