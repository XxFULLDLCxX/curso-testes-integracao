import supertest from 'supertest';

import app from './../src/app';
import prisma from '../src/database';

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe('POST /users tests', () => {
  it('should create a user', async () => {
    const result = await api.post('/users').send({ email: 'aaa@aaa.aaa', password: '123' });
    expect(result.status).toBe(201);
  });

  it('should receive 409 when trying to create two users with same e-mail', async () => {
    await prisma.user.create({ data: { email: 'aaa@aaa.aaa', password: '123' } });
    const result = await api.post('/users').send({ email: 'aaa@aaa.aaa', password: '123' });
    expect(result.status).toBe(409);
  });
});

describe('GET /users tests', () => {
  it('should return a single user', async () => {
    await prisma.user.create({ data: { email: 'aaa@aaa.aaa', password: '123' } });
    const result = await api.get('/users');
    expect(result.status).toBe(200);
    expect(result.body).toEqual([{ email: 'aaa@aaa.aaa' }]);
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await api.get('/users/1');
    expect(result.status).toBe(404);
  });

  it('should return all users', async () => {
    await prisma.user.create({ data: { email: 'aaa@aaa.aaa', password: '123' } });
    await prisma.user.create({ data: { email: 'aab@aaa.aaa', password: '123' } });
    await prisma.user.create({ data: { email: 'aac@aaa.aaa', password: '123' } });
    const result = await api.get('/users');
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String),
        }),
      ])
    );
  });
});
