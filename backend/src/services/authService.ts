import bcrypt from "bcrypt";
import {
  createUserModel,
  findUserByEmailModel,
  User
} from "../models/authModel";

export const registerUserService = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {

  const existingUser = await findUserByEmailModel(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await createUserModel(name, email, hashedPassword);
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<User> => {

  const user = await findUserByEmailModel(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};