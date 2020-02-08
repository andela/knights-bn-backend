import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

describe('Create a user account.(POST) ', () => {
  it('New user, it should return 201 on successful signup', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  
  it('New user, it should return 401 when password confirmation does not match ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

});
