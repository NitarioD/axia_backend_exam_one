const express = require('express');

const { createUser, signin, deleteUser, updateUser, getUser } = require('../controllers/user.controller');
const {authenticate} = require('../middleware/auth');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', signin);
routes.delete('/user/:id', authenticate, deleteUser);
routes.put('/user/:id', authenticate, updateUser);
routes.get('user/:id', getUser);

module.exports = routes;