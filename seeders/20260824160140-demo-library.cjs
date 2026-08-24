'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const now = new Date();
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Qifrey Atelier',
        email: 'qifrey.atelier@example.com',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Frieren Himmel',
        email: 'frieren.himmel@example.com',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Jesse McCree',
        email: 'jesse.mccree@example.com',
        createdAt: now,
        updatedAt: now
      }
    ]);
    const users = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Users";`,{ type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Finish Mentoring Session',
        dueDate: new Date('2026-08-31'),
        completed: false,
        userId: idOf('Qifrey Atelier'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Prepare New Methods of Teaching',
        dueDate: new Date('2026-09-05'),
        completed: false,
        userId: idOf('Frieren Himmel'),
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Submit Missing Documents',
        dueDate: new Date('2026-09-10'),
        completed: false,
        userId: idOf('Jesse McCree'),
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
