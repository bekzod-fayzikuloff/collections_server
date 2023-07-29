import { FindOptions, ModelStatic, Model } from "sequelize/types/model";

export const createInstance = async (model: any, payload: any): Promise<any> => {
  return await model.create(payload);
};

export const getAll = async (model: ModelStatic<Model>, options?: FindOptions<any>): Promise<any[]> => {
  return await model.findAll(options);
};

export const getOne = async (model: ModelStatic<Model>, options?: FindOptions<any>): Promise<any> => {
  return await model.findOne(options);
};

export const updateInstance = async (instance: any, newValues: any) => {
  for (let property of Object.entries(newValues)) {
    const [key, value] = property;
    instance[key] = value;
  }
  instance.save();
};
