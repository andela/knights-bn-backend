import models from '../db/models';

class UserQuery {
  static async getUser(_attr, value) {
    let user;
    switch (_attr) {
      case 'id':
        user = await models.User.findOne({
          where: { id: value },
        });
        break;

      case 'email':
        user = await models.User.findOne({
          where: { email: value },
        });
        break;

      default:
        user = null;
        break;
    }
    return user;
  }

  static getManager(managerId) {
    return models.User.findOne(
      { where: { id: managerId, role: 'manager' } },
    );
  }

  static getUserByEmail(email) {
    return models.User.findOne(
      { where: { email } },
    );
  }

  static async updateUserRole(role, email) {
    const userToUpdate = await this.getUserByEmail(email);
    const { dataValues } = userToUpdate;
    const updatedUser = await models.User.update({ role }, { where: { email: dataValues.email } });
    return updatedUser;
  }
}
export default UserQuery;
