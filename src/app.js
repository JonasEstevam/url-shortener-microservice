require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const app = express();
const NODE_ENV = process.env.NODE_ENV;
const MONGO_URI =
  NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

(async () => {
  await mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) {
        return console.log(err);
      }
      NODE_ENV === 'test'
        ? console.log('Test database is UP')
        : console.log('Production database is UP');
    }
  );

  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use(express.json());

  app.use('/api', routes);
})();

module.exports = app;
