module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn({
      tableName: 'Users',
      schema: 'public'
    }, 'userId'),
    queryInterface.addColumn({
      tableName: 'Users',
      schema: 'public'
    },
    'role',
    Sequelize.STRING)
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
