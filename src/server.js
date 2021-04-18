const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    err ? console.log(err) : console.log(`Database is up`);
  }
);

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is up on port ${PORT}`);
});
