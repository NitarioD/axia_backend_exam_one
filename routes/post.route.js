const express = require('express');
const authenticate = require('../middleware/auth');

const {createPost, deletePost, updatePost, getAllPosts, getPost } = require('../controllers/post.controller');

const routes = express.Router();

routes.post('/post', authenticate, createPost);
routes.put('/post/:id', authenticate, updatePost);
routes.delete('/post/:id', authenticate, deletePost);
routes.get('/post', getAllPosts)
routes.get('/post/:id', getPost)


module.exports = routes;