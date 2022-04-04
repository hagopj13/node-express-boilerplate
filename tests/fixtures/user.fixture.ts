import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { User, UserModel } from '../../src/models/user.model';

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

export type MockUser = { name: string; email: string; password: string } & Partial<
  Omit<mongoose.LeanDocument<UserModel>, 'isPasswordMatch' | 'typegooseName'>
>;

export const userOne: MockUser = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const userTwo: MockUser = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

export const admin: MockUser = {
  _id: new mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

export const insertUsers = async (users: MockUser[]) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};
