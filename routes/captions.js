const express = require('express');
const router = express.Router();
const { Caption, User } = require('../models');

// Create a new caption
router.post('/', async (req, res) => {
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

// Get all captions
router.get('/', async (req, res) => {
  try {
    console.log('GET /caption');
    const captions = await Caption.findAll({ include: ['user']});
    return res.status(200).json(captions);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

module.exports = router;