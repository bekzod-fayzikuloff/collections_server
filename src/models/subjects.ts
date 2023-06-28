import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";

export const Subjects = sequelize.define("subject", {
  id: {
    field: "subjectId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    field: "subjectTitle",
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    field: "subjectDescription",
    type: DataTypes.TEXT,
  },
});
