const express = require('express');
const router = express.Router();
const { Caption, User } = require('../../database/models');
const { render } = require('ejs');


//Homepage 
router.get('/', (req, res) => {
  res.render('home', { username: req.session.username }); 
});

module.exports = router;