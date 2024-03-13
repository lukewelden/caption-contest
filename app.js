const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption, Image } = require('./database/models/index.js');
const users = require('./routes/users.js');
const captions = require('./routes/captions.js');
const images = require('./routes/images.js');

app.use(express.json());
app.use('/users', users);
app.use('/captions', captions);
app.use('/images', images);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});   
