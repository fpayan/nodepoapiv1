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

// Create new Announces
const _newAnnounce = null;
const _listIdUser = [];

// Find user
const findAllUser = async ()=>{
    const _queryAllUsers = ModelUser.find({}).exec((err, listUser)=>{
        if(err){
            console.log('ERROR TO READING USER..', err);
        }
        if(listUser){
            listUser.forEach((announ)=>{
                _listIdUser.push(announ._id);
            });
            //
            loadAnnouncesIntoDB(_listIdUser, 10);
            
        }else{
            console.log('NOT USER LIST..', _listIdUser);
            mongoose.connection.close(function () {
                console.log('Mongoose connection disconnected');
            });
            return [];
        }
    });
}


let loadAnnouncesIntoDB = async function (arraID, slepp){
    // db_conn.dropDatabase((err)=>{
    //     if(err){
    //         console.log('DROP ERROR :', err);
    //     }
    //     console.log('DROP COLLECTIONS ANNOUNCES OK !');
    // });
    let _newAnnounce = null;

    for(let i = 0; i < slepp; i++){

        let _newAnnoun = {
            nameArticle: faker.name.title(),
            textArticle: faker.lorem.lines(4), 
            price: faker.random.number({min: 20, max: 100000, precision: 2}),
            salesAnnounce: faker.random.boolean(),
            urlImage: faker.image.imageUrl({width: 500, height: 300, category: 'Image'}) + '/' + i,
            tags: faker.random.arrayElement(['work', 'lifestyle', 'motor', 'mobile']),
            idUserOwn: faker.random.arrayElement(_listIdUser),
            created: new Date(),
            update: new Date()
        };
        ModelAnnounce.create(_newAnnoun, (err, announce)=>{
            //
            if(err){
                console.log('ERROR CREATE ANNOUNCE..', err);
            }
            if(announce){
                console.log('CREATED ANNOUNCE..\n', announce);
            }
            else{
                console.log('NOT CREATED ANNOUNCE..\n');
            }
        });
    }// end for
};

let users = findAllUser();
users.then(()=>{
    
});