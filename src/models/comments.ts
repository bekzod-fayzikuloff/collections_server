import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define("comment", {
  id: {
    field: "commentId",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
