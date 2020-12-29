const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportStrategy = require('./middleware/passport-strategy');
const authRoutes = require('./routes/auth.routes');

const keys = require('./keys');
const app = express();

mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('Mongo DB connected'))
  .catch(err => console.error(err))

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);


module.exports = {
  path: '/api',
  handler: app
}