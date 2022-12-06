const { Router } = require('express');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github-service');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
      let user = await GithubUser.getByLogin(login);
      if (!user) {
        user = await GithubUser.insert({
          login,
          avatar: avatar_url,
        });
      }
      console.log('user is::', user);
      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/github/dashboard');
    } catch (e) {
      next(e);
    }
  })
  .delete('/', async (req, res, next) => {
    try {
      //something
      console.log(':::: Logging Out ::::');
      res
        .clearCookie(process.env.COOKIE_NAME, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .status(204)
        .send();
    } catch (e) {
      next(e);
    }
  });
