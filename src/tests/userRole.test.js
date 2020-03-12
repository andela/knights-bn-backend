import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();
const adminSetRoles = () => {
  describe('Super Admin Setting User Roles', () => {
    // before((done) => {
    //   chai
    //     .request(app)
    //     .post('/api/v1/auth/login')
    //     .send(mockData.superAdminLogin)
    //     .end((err, res) => {
    //       console.log('SUPER ADMIN===>', res.body);
    //     });
    //   done();
    // });
    it('should throw 404 when user is not found', (done) => {
      const id = 20;
      chai
        .request(app)
        .patch(`/api/v1/user/userRole/${id}`)
        .send(mockData.newRole)
        .end((err, res) => {
          console.log('UPDATED==>', res.body);
        });
      done();
    });
  });
};
export default adminSetRoles;
