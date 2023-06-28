import { User } from "../models/users";

export const usersEmailIsExist = async (email: string) => {
  return !!(await User.findOne({ where: { email } }));
};
