const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption, Image } = require('./database/models/index.js');
const users = require('./routes/users.js');
const captions = require('./routes/captions.js');
const images = require('./routes/images.js');
const session = require('express-session');
require('dotenv').config();

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    conString: process.env.DATABASE_CONNECTION_STRING
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
})); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/captions', captions);
app.use('/images', images);

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  } 
  req.session.views += 1;
  console.log(req.session)
  res.send(`You have visited this page ${req.session.views} times!`)
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});   
