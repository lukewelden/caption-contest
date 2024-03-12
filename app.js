const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption } = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
}); 

app.get('/users', async (req, res) => {
  try {
    console.log('GET /users');
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}); 

app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
      console.log('GET /users/:uuid');
      
      const user = await User.findOne({
        where: { uuid }, 
        include: ['captions']
      });
       
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).send('User with the specified UUID does not exist');
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
});

app.post('/users', async (req, res) => {
  console.log('POST /users');
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}); 

app.post('/caption', async (req, res) => {
  try {
    console.log('POST /caption');
    const { image_id, user_uuid, caption } = req.body;
    const user = await User.findOne({ where: { uuid: user_uuid } });
    const newCaption = await Caption.create({ image_id, user_id: user.id, caption });
    return res.status(201).json(newCaption);
  } catch (e){
    console.log(e);
    return res.status(500).json(e);
  }
});

app.get('/caption', async (req, res) => {
  try {
    console.log('GET /caption');
    const captions = await Caption.findAll({ include: ['user']});
    return res.status(200).json(captions);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}); 

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});   
