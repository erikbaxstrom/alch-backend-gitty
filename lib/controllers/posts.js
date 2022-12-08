const { Router } = require('express');
const { Post } = require('../models/Post');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    console.log('got to the controller::');
    const response = await Post.getAll();
    res.send(response);
  } catch (e) {
    next(e);
  }
});
