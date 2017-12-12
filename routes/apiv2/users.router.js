'use strict';

const express = require('express'),
    router = express.Router(),
    app = express();

const userController = require('../../controllers/users.controller');
const API_VERSION = '/apiv2'

module.exports = (app)=>{
    app.route(API_VERSION + '/register/:web?')
    .get(userController.register)
    .post(userController.register);

    app.route(API_VERSION + '/login')
    .get(userController.login)
    .post(userController.login);

    app.route(API_VERSION + '/logout')
    .get(userController.logout)
    .post(userController.logout);

    app.route(API_VERSION + '/announce')
    .get(userController.requiresLogin)
    .post(userController.requiresLogin);
};