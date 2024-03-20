const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption, Image } = require('./database/models/index.js');
const users = require('./web/routes/users.js');
const captions = require('./web/routes/captions.js');
const images = require('./web/routes/images.js');
const auth = require('./web/routes/auth.js');
const home = require('./web/routes/home.js');
const session = require('express-session');
const morgan = require('morgan');
var passport = require('passport');
require('dotenv').config();
require('./web/config/passport');

app.set('views', './web/views');
app.set('view engine', 'ejs');

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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', users);
app.use('/captions', captions);
app.use('/images', images);
app.use('/auth', auth);
app.use('/home', home);

// Home page 
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});   
