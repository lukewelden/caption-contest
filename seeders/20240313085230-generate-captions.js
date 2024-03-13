'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('captions', [
      {
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a6f",
        image_id: 1,
        caption: 'This is a caption for the first image',
        user_id: 1,
        createdAt: "2024-03-13T08:52:30.000Z",
        updatedAt: "2024-03-13T08:52:30.000Z"
      },
      {
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a70",
        image_id: 1,
        caption: 'This is a caption for the first image',
        user_id: 2,
        createdAt: "2024-03-13T08:52:30.001Z",
        updatedAt: "2024-03-13T08:52:30.001Z"
      },
      {
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a71",
        image_id: 2,
        caption: 'This is a caption for the second image',
        user_id: 1,
        createdAt: "2024-03-13T08:52:30.001Z",
        updatedAt: "2024-03-13T08:52:30.001Z"
      },
      {
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a72",
        image_id: 2,
        caption: 'This is a caption for the second image',
        user_id: 2,
        createdAt: "2024-03-13T08:52:30.001Z",
        updatedAt: "2024-03-13T08:52:30.001Z"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('captions', null, {});
  }
};
