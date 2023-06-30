import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";

export const Tag = sequelize.define("tag", {
  id: {
    field: "tagId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    field: "tagTitle",
    type: DataTypes.STRING,
    allowNull: false,
  },
});
