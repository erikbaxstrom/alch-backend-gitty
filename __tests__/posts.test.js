const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github-service');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/posts for logged out user should return a 401 error', async () => {
    const response = await request(app).get('/api/v1/posts');
    expect(response.status).toBe(401);
  });

  it('GET /api/v1/posts for logged in user should return a list of posts', async () => {
    // log in
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    // get the route
    const response = await agent.get('/api/v1/posts');

    //expect list back
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "detail": "I can haz code?",
          "id": "1",
          "user_id": "1",
        },
        Object {
          "detail": "What would you think if I coded a tune?",
          "id": "2",
          "user_id": "2",
        },
        Object {
          "detail": "I ate a slug",
          "id": "3",
          "user_id": "1",
        },
      ]
    `);
  });

  it.skip('POST for logged out should 401 error', async () => {
    //test
  });

  it.skip('POST for logged in should return the posted thing', async () => {
    //test
  });
});
