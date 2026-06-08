import User, { IUser } from '../models/userModel';

export const getAllUsersService = async () => {
    return await User.find();
};

export const getUserByIdService = async (id: string) => {
    return await User.findById(id);
};

export const createUserService = async (userData: Partial<IUser>) => {
    // Como usamos o pre('save') no model, a senha será hashada automaticamente aqui
    const user = new User(userData);
    return await user.save();
};

export const updateUserService = async (id: string, updateData: Partial<IUser>) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUserService = async (id: string) => {
    return await User.findByIdAndDelete(id);
};

export const deleteAllUsersService = async () => {
    return await User.deleteMany();
};

// // src/services/userService.ts
// import { prisma } from '../config/db';
// import bcrypt from 'bcrypt';

// export const createUser = async (data: { name: string; email: string; password: string }) => {
//   const hashedPassword = await bcrypt.hash(data.password, 10);

//   return prisma.user.create({
//     data: {
//       name: data.name,
//       email: data.email,
//       password: hashedPassword,
//     },
//   });
// };

// export const findUserByEmail = async (email: string) => {
//   return prisma.user.findUnique({ where: { email } });