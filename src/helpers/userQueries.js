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

  static async getUserById(id) {
    const foundUser = await models.User.findOne({ where: { id } });
    return foundUser;
  }

  static async updateUserRole(role, id) {
    const userToUpdate = await this.getUserById(id);
    const { dataValues } = userToUpdate;
    const updatedUser = await models.User.update({ role }, { where: { id: dataValues.id } });
    return updatedUser;
  }
}
export default UserQuery;
