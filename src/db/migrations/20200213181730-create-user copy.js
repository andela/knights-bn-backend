
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    passport: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    method: {
      type: Sequelize.STRING
    },
    clientId: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
