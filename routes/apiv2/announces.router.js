'use strict';

const express = require('express'),
router = express.Router(),
app = express();

const userController = require('../../controllers/users.controller');
const API_VERSION = '/apiv2',
    API_OBJECT_NAME = '/announce';

module.exports = (app)=>{
    app.route(`${API_VERSION}${API_OBJECT_NAME}`) // /apiv?/announce
    .get(userController.requiresLogin)
    .post(userController.requiresLogin);
};