'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('users', [
      {
        username: 'john_doe@fakeemail.com',
        password: '6e30602c447c61aab85a9432e0976f496f1497214fa2d4af8ea492fd397d6bc6e90f681ef14971b3e2250c2c91f793bafce2b85679121a8d60dfa80c5c36974a',
        salt: '4eb24780718eebd041d7a6656ff28cedd45c9b620b41314775f071021baf3bce',
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a6d",
        createdAt: "2024-03-13T08:07:12.000Z",
        updatedAt: "2024-03-13T08:07:12.000Z"
      },
      {
        username: 'jane_doe@fakeemail.com',
        password: '2347660ae1c839a33275e51fb79cb9110f4ddc1b4dc736b05436c991a179f4604747b7bf04372017cb66eadbad16a04a6149c80951cb0d514170436a79fc85f8',
        salt: '0b21adfe3038802f6cbdf7f4c4dea85d47726543ccf04a1b8d334ff0729b06e9',
        uuid: "7746de19-cc2b-4970-a12b-0dc151683a6e",
        createdAt: "2024-03-13T08:07:12.001Z",
        updatedAt: "2024-03-13T08:07:12.001Z"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('users', null, {});
  }
};
