module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VehicleImages', {
      VehicleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Vehicles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ImageId: {
        type: Sequelize.INTEGER,
        references: { model: 'Images', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VehicleImages');
  }
};
