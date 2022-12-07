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

  it('/api/v1/github/login should redirect to github oauth', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d.]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('/api/v1/github/callback should login users and redirect to the dashboard', async () => {
    const response = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    console.log('response.body::', response.body);
    expect(response.body).toEqual({
      id: expect.any(String),
      login: 'fake_github_user',
      avatar: 'https://placebear.com/300/300',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  it('DELETE /api/v1/posts for logged in user should log out the user', async () => {
    // log in
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42').redirects(1);
    const response = await agent.delete('/api/v1/github');
    expect(response.status).toBe(204);
  });
});
