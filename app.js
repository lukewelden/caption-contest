const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption, Image } = require('./database/models/index.js');
const users = require('./web/routes/users.js');
const captions = require('./web/routes/captions.js');
const images = require('./web/routes/images.js');
const session = require('express-session');
var passport = require('passport');
require('dotenv').config();
require('./web/config/passport');

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    conString: process.env.DATABASE_CONNECTION_STRING
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
})); 

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/captions', captions);
app.use('/images', images);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});   
