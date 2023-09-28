import { User } from '@prisma/client';
import prisma from 'database';

type CreateUser = Omit<User, 'id'>;

export const create = async (user: CreateUser) => {
  return prisma.user.create({ data: user });
};

export const createMany = async (user: Array<CreateUser>) => {
  return prisma.user.createMany({ data: user });
};

export const user = {
  create, createMany
}