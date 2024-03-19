const express = require('express');
const router = express.Router();
const { Image } = require('../../database/models');

// Get all images
router.get('/', async (req, res) => {
    try {
      console.log('GET /images');
      const images = await Image.findAll();
      return res.status(200).json(images);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  });
  
// Get specific image by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    console.log('GET /images/:id');
    const image = await Image.findOne({ where: { id }, include: ['captions'] });
    if (image) {
      return res.status(200).json(image);
    } else {
      return res.status(404).send('Image with the specified ID does not exist');
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

module.exports = router;