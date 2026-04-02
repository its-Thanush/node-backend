const request = require('supertest');
const app     = require('../app');

let token;

beforeAll(async () => {
  await request(app).post('/auth/register')
    .send({ name: 'Admin', email: 'admin@test.com', password: 'password123' });
  const res = await request(app).post('/auth/login')
    .send({ email: 'admin@test.com', password: 'password123' });
  token = res.body.token;
});

describe('GET /users', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(401);
  });
  it('returns users array with valid token', async () => {
    const res = await request(app).get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
  const prisma = require('../lib/prisma');
  await prisma.$disconnect();
}, 10000);