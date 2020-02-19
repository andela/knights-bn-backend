
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER
  }, {});
  Role.associate = (models) => {
  };
  return Role;
};
