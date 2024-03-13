const express = require('express')
const app = express()
const port = 3000
const { sequelize, User, Caption } = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
}); 

// USER ROUTES
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
    if (e.name === 'SequelizeValidationError') {
      return res.status(400).json(e.errors.map(err => err.message));
    } else {
      console.log(e);
      return res.status(500).json(e);
    }
    
  }
});

app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    console.log('DELETE /users/:uuid');
    const user = await User.findOne({ where: { uuid } });
    if (user) {
      await user.destroy();
      return res.status(204).send();
    } else {
      return res.status(404).send('User with the specified UUID does not exist');
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const { password } = req.body;
  try {
    console.log('PUT /users/:uuid');
    const user = await User.findOne({ where: { uuid } });
    if (user) {
      user.password = password;
      await user.save();
      return res.status(200).json("password updated!");
    } else {
      return res.status(404).send('User with the specified UUID does not exist');
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
}); 

// CAPTION ROUTES
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
