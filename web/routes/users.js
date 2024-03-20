const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');
const passport = require('passport');
const { hashPassword } = require('../utils/passwords');


// Get all users 
router.get('/', async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }); 
  
// Get specific user by UUID
router.get('/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
    
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

// Delete a user by UUID
router.delete('/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  try {
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

// Update a user's password by UUID
router.put('/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const { password } = req.body;

  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.findOne({ where: { uuid } });
    if (user) {
      user.password = hashedPassword;
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

module.exports = router;