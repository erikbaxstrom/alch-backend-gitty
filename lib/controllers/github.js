const { Router } = require('express');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github-service');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      console.log('code::', code);
      const token = await exchangeCodeForToken(code);
      console.log('here is token::', token);
      const { login, avatar_url } = await getGithubProfile(token);
      console.log('user stufffff::', login, avatar_url);
    } catch (e) {
      next(e);
    }
  });
