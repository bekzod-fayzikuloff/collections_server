import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { UserInstance } from "../types/models/users.models";

export const User = sequelize.define<UserInstance>("user", {
  id: {
    field: "userId",
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  username: {
    field: "userName",
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    field: "userEmail",
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  },

  password: {
    field: "userPasswordHash",
    type: DataTypes.STRING,
    allowNull: false,
  },

  isAdmin: {
    field: "userIsAdmin",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
