import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { User } from "./users";

export const Like = sequelize.define("like", {
  id: {
    field: "likeId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

Like.belongsTo(User);
