import prisma from '../../src/database';
import { UserInput } from '../../src/repository';
import { faker } from '@faker-js/faker';

export function generateUserData() {
  const userData: UserInput = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  return userData;
}

export async function buildUser() {
  const userData = generateUserData();
  const user = await prisma.user.create({ data: userData });
  return user;
}
