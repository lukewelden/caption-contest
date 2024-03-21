const express = require('express');
const router = express.Router();
const { Caption, User } = require('../../database/models');
const { render } = require('ejs');
const { isAuthenticated } = require('../utils/authMiddleware');


//Homepage 
router.get('/', isAuthenticated, (req, res) => {
  res.render('home', { username: req.session.username }); 
});

module.exports = router;