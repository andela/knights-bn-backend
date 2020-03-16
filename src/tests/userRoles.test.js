import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
const testUserRoles = () => {
  describe('USER ROLE SETTINGS | TESTS', () => {
    it('should sign in the super admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.superAdminLogin)
        .end((err, res) => {
          console.log('User token', res.body);
        });
      done();
    });
    it('should update an existing user', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/users/setUserRole?email=${mockData.updatableUser.email}`)
        .send(mockData.newRole)
        .end((err, res) => {
          console.log('UPDATED==>', res.body);
        });
      done();
    });
  });
};

export default testUserRoles;
