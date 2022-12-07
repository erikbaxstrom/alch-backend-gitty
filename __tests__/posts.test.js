const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { getByLogin } = require('../lib/models/GithubUser.js');

jest.mock('../lib/services/github-service');

describe('github auth', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/posts for logged out should return a 401 error', async () => {
    const response = await request(app).get('/api/v1/posts');
    expect(response.status).toBe(401);
  });

  it('GET /api/v1/posts for logged out should return a list of posts', async () => {
    // log in
    const [agent] = await getByLogin();
    // get the route
    const response = await agent.get('/api/v1/posts');
    //expect list back
    expect(response.status).toBe(200);
  });

  it.skip('POST for logged out should 401 error', async () => {
    //test
  });

  it.skip('POST for logged in should return the posted thing', async () => {
    //test
  });
});
