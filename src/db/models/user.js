'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    passport: DataTypes.STRING,
    password: DataTypes.STRING,
    method: DataTypes.STRING,
    clientId: DataTypes.STRING
  }, {});
  User.associate = (models) => {
  };
  return User;
};
