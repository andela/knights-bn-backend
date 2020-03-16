module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("create type \"enum_Users_role\" AS ENUM( \'superAdmin\',\'manager\', \'requester\',\'traveladmin\',\'supplier\'); ALTER TABLE \"Users\" ADD COLUMN \"role\" \"enum_Users_role\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('drop type "enum_Users_role" CASCADE');
  },
};
