import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import localStorage from 'localStorage';
import environment from 'dotenv';
import app from '../app';
import returnTripMock from '../mockData/returnTrip';
import generateToken from '../utils/generateToken';

environment.config();


chai.use(chaiHttp);
chai.should();

const { validTrip } = returnTripMock;


const testViewRequest = () => {
  describe('View all my Requests.(GET) ', () => {
    before(() => {
      const token = generateToken({
        userId: 4,
        email: 'willishimw@gmail.com',
        firstName: 'firstName',
        lastName: 'lastName',
      }, process.env.SECRETKEY);
      localStorage.setItem('token', token);
    });
    it('it should return 404 if there is no request history', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.equal('No request found');
        });
      done();
    });
    it('should return 200 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send(validTrip)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('request created on success!');
          expect(res.body).to.have.property('status').that.equals('pending');
        });
      done();
    });
    it('it should return the list of requests (200)', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/myRequest')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('List of requests');
        });
      done();
    });
  });
};

export default testViewRequest;
