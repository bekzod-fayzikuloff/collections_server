import { Sequelize } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize(`${config.DB_LINK}`);
