import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { Tag } from "./tags";
import { Like } from "./likes";
import { Comment } from "./comments";
import { Collection } from "./collections";

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

  customFields: {
    type: DataTypes.TEXT,
    get: function () {
      // @ts-ignore
      return JSON.parse(this.getDataValue("customFields"));
    },
    set: function (value) {
      // @ts-ignore
      this.setDataValue("customFields", JSON.stringify(value));
    },
    defaultValue: "{}",
  },
});

Item.hasMany(Tag);
Item.hasMany(Like);
Item.hasMany(Comment);
Item.belongsTo(Collection);
