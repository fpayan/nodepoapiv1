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

mongoose.connect('mongodb://localhost:27017/nodepop').then(()=>{
    createUsers().then(result =>{
        //
        createAnnounces(result).then(result =>{
            console.log('END SCRIPT WITH RESULTED : ',result);
            db_conn.close(err=>{
                console.log('CLOSE DB END METHOD :', err);
            });
        });

    });
    
});

const ModelUser = require('mongoose').model('User');
const ModelAnnounce = require('mongoose').model('Announce');
async function createUsers() {
    let array_id_users = [];
    let _newUser = null;
    let _passHash = crypto.createHash('sha256').update('12345').digest('hex'); // All pass to be 12345

    await db_conn.collection('users').drop();
    //    
    for(let i = 0; i < 5; i++){
        if(i === 1){
            _newUser = new ModelUser({
                name: faker.name.firstName(),
                age: faker.random.number({min:18, max: 90}),
                email: "faker1@faker.org",
                password: _passHash,
                role: 'Admin',
                created: new Date(),
                update: faker.date.future('2018')
            });
        
            await _newUser.save((err, newUserCreated)=>{
                if(err){
                    console.log('ERROR TO SAVING: ', err);
                }
                array_id_users.push( newUserCreated._id );
                console.log('OK save user: \n', newUserCreated);
            });
        }
        else{
            _newUser = new ModelUser({
                name: faker.name.firstName(),
                age: faker.random.number({min:18, max: 90}),
                email: faker.internet.email(),
                password: _passHash,
                role: 'Client',
                created: new Date(),
                update: faker.date.future('2018')
            });
            await _newUser.save((err, newUserCreated)=>{
                if(err){
                    console.log('ERROR TO SAVING: ', err);
                }
                array_id_users.push( newUserCreated._id );
                console.log('OK save user: \n', newUserCreated);
            });
        }// end if        
    }// end for.
    return array_id_users;
}

async function createAnnounces(arrID, slepp){
    let _newAnnounce = null;
    let _total = null;

    for(let i = 0; i < slepp; i++){

         _newAnnoun = {
            nameArticle: faker.name.title(),
            textArticle: faker.lorem.lines(4), 
            price: faker.random.number({min: 20, max: 100000, precision: 2}),
            salesAnnounce: faker.random.boolean(),
            urlImage: faker.image.imageUrl({width: 500, height: 300, category: 'Image'}) + '/' + i,
            tags: faker.random.arrayElement(['work', 'lifestyle', 'motor', 'mobile']),
            idUserOwn: faker.random.arrayElement(arrID),
            created: new Date(),
            update: new Date()
        };
        await ModelAnnounce.create(_newAnnoun, (err, announce)=>{
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
    return await ModelAnnounce.find().count() > 0 ? 'OK' : 'NOT ANNOUNCES';
}

