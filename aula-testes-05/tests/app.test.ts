import supertest from 'supertest';

import app from './../src/app';

const api = supertest(app);

describe('API test', () => {
  it('should return 200 when ask /health', async () => {
    const { status, text } = await api.get('/health');
    expect(status).toBe(200);
    expect(text).toBe('OK!');
  });
  it("should return 400 when 'elements' query parameter is missing...", async () => {
    const { status } = await api.get('/fibonacci');
    expect(status).toBe(400);
  });
  it("should return 400 when 'elements' query parameter is not a number...", async () => {
    for (const e of ['A', '']) {
      const result = await api.get(`/fibonacci?elements=${e}`);
      expect(result.status).toBe(400);
    }
  });
  it("should return 400 when 'elements' query parameter is not a valid number...", async () => {
      const result = await api.get(`/fibonacci?elements=-3`);
      expect(result.status).toBe(400);
  
  });
  it("should return 200 when 'elements' query paramenter is a number...", async () => {
    const result = await api.get(`/fibonacci?elements=8`);
    expect(result.body).toEqual([0,1,1,2,3,5,8,13]);
  })
});
