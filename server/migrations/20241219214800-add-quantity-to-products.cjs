'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // First try to remove if exists
      await queryInterface.removeColumn('products', 'quantity').catch(() => {});
      
      // Then add the column
      await queryInterface.addColumn('products', 'quantity', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      });
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('products', 'quantity');
    } catch (error) {
      console.error('Migration rollback failed:', error);
      throw error;
    }
  }
};