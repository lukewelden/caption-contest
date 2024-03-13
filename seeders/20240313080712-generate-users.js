'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe@fakeemail.com',
        password: 'thisisasecurepassword',
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a6d",
        createdAt: "2024-03-13T08:07:12.000Z",
        updatedAt: "2024-03-13T08:07:12.000Z"
      },
      {
        username: 'jane_doe@fakeemail.com',
        password: 'thisisasecurepasswordtoo',
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a6e",
        createdAt: "2024-03-13T08:07:12.001Z",
        updatedAt: "2024-03-13T08:07:12.001Z"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
