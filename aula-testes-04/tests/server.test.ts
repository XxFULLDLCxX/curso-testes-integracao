import { app } from 'app';
import supertest from 'supertest';

const server = supertest(app);

describe('api', () => {
  it(('GET /health return 200'), async () => {
    const { statusCode } = await server.get('/health');
    expect(statusCode).toBe(200);
  });
});
