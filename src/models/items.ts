import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { Tag } from "./tags";
import { Like } from "./likes";
import { Comment } from "./comments";
import { Collection } from "./collections";

export const CustomField = sequelize.define("customField", {
  id: {
    field: "fieldId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  type: {
    field: "fieldType",
    type: DataTypes.STRING,
    allowNull: false,
  },

  value: {
    type: DataTypes.TEXT,
    get: function () {
      // @ts-ignore
      return JSON.parse(this.getDataValue("value"));
    },
    set: function (value) {
      // @ts-ignore
      this.setDataValue("value", JSON.stringify(value));
    },
  },
});

export const Item = sequelize.define("item", {
  id: {
    field: "itemId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    field: "itemTitle",
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Item.hasMany(Tag);
Item.hasMany(Like);
Item.hasMany(Comment);
Item.hasMany(CustomField);
Item.belongsTo(Collection);
