import { sequelize } from "../database/sequelize";
import { DataTypes } from "sequelize";
import { Subjects } from "./subjects";
import { User } from "./users";
import { CollectionInstance } from "../types/models/collections.models";

const Collection = sequelize.define<CollectionInstance>("collection", {
  id: {
    field: "collectionId",
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    field: "collectionTitle",
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    field: "collectionDescription",
    type: DataTypes.TEXT,
  },

  image: {
    field: "collectionImage",
    type: DataTypes.STRING,
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

Collection.belongsTo(Subjects);
Collection.belongsTo(User);

export { Collection };
