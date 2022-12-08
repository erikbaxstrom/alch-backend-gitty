const { Router } = require('express');
const { Post } = require('../models/Post');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const response = await Post.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const response = await Post.create({
        detail: req.body.detail,
        userId: req.user.id,
      });
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
