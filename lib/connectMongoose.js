'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;
//
require('dotenv').config();

mongoose.Promise = global.Promise;

conn.on('error', err => {
  console.log('Error!', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log(`Conectado a MongoDB en ${mongoose.connection.name}`);
})

mongoose.connect(`${process.env.DB_CONNECT_MONGOOSE}${process.env.DB_NAME}`, {
  useMongoClient: true
});

module.exports = conn;
