'use strict';

const mongoose = require('mongoose');//.model('User');
const db_conn = mongoose.connection;
const faker = require('faker');
const crypto = require('crypto');

require('../../models/user.model');
require('../../models/announce.model');

db_conn.on('error', (error)=>{
    console.log('ERROR TO CONECTING: ', error);
});

db_conn.on('close', (error)=>{
    console.log('CLOSED TO DB: ', error);
});

db_conn.once('open', ()=>{
    console.log('Connected to MongoDB!');     
});

mongoose.connect('mongodb://localhost:27017/nodepop');

const ModelUser = require('mongoose').model('User');
const ModelAnnounce = require('mongoose').model('Announce');

let _newUser = null;
let _passHash = crypto.createHash('sha256').update('12345').digest('hex');
// Create new users
for(let i = 0; i < 5; i++){
    _newUser = new ModelUser({
        name: faker.name.firstName(),
        age: faker.random.number({min:18, max: 90}),
        email: faker.internet.email(),
        password: _passHash,
        role: 'Client',
        created: new Date(),
        update: faker.date.future('2018')
    });

    _newUser.save((err, newUserCreated)=>{
        if(err){
            console.log('ERROR TO SAVING: ', err);
        }
        console.log('OK save user: \n', newUserCreated);
    });
}



