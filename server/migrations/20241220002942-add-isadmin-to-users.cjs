'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.describeTable('users').then(table => {
        if (!table.isAdmin) {
          return queryInterface.addColumn('users', 'isAdmin', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          });
        }
      });
    } catch (error) {
      console.log('Column may already exist:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'isAdmin');
  }
};
