export const createInstance = async (model: any, payload: any): Promise<any> => {
  return await model.create(payload);
};
