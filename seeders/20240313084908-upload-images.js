'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('images', [
      {
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        createdAt: "2024-03-13T08:49:08.000Z",
        updatedAt: "2024-03-13T08:49:08.000Z"
      },
      {
        image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_noncolor_272x92dp.png',
        createdAt: "2024-03-13T08:49:08.001Z",
        updatedAt: "2024-03-13T08:49:08.001Z"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('images', null, {});
  }
};
