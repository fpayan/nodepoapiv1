'use strict';

//const db_conn = require('../../lib/connectMongoose');
const mongoose = require('mongoose');//.model('User');
const db_conn = mongoose.connection;
const faker = require('faker');

require('../../models/user.model');
require('../../models/announce.model');


db_conn.on('error', (error)=>{
    console.log('ERROR TO CONECTING: ', error);
    return false;
});

db_conn.on('close', (error)=>{
    console.log('CLOSED TO DB: ', error);
    return false;
});

db_conn.once('open', ()=>{
    console.log('Connected to MongoDB!');  
    return true;   
});

mongoose.connect('mongodb://localhost:27017/nodepop');

const ModelUser = require('mongoose').model('User');
const ModelAnnounce = require('mongoose').model('Announce');

module.exports = db_conn;