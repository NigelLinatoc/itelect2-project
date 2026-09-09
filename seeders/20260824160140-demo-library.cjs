'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const now = new Date();
    const admin = await bcrypt.hash('admin123', 10);
    const member = await bcrypt.hash('member123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Qifrey Atelier',
        email: 'qifrey.atelier.new@example.com',
        password: admin,
        role: 'admin',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Frieren Himmel',
        email: 'frieren.himmel.new@example.com',
        password: member,
        role: 'member',
        createdAt: now,
        updatedAt: now
      },
      {
        name: 'Jesse McCree',
        email: 'jesse.mccree.new@example.com',
        password: member,
        role: 'member',
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
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
