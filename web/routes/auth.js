const express = require('express');
const router = express.Router();
const { User } = require('../../database/models');
const passport = require('passport');
const { hashPassword } = require('../utils/passwords');

// Register page 
router.get('/register', (req, res) => {
    res.render('register');
  });

// User login
router.get('/login', (req, res) => {
    res.render('login');
  }); 
router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login', failureMessage: true}), (req, res) => { 
    req.session.username = req.body.username;
    res.redirect('/home');
  });

  // Create a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const {hash, salt} = await hashPassword(password);
  
    try {
      const user = await User.create({ username, password: hash, salt: salt });
      return res.render('login');
    } catch (e) {
      if (e.name === 'SequelizeValidationError') {
        return res.status(400).json(e.errors.map(err => err.message));
      } else {
        console.log(e);
        return res.status(500).json(e);
      }
      
    }
  });

  // User logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;