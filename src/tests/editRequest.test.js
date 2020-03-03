import chai from 'chai';
import chaiHttp from 'chai-http';
import mockData from './mockData';
import app from '../app';
import isObjectEmpty from '../utils/isObjectEmpty';

chai.use(chaiHttp);
const { expect } = chai;

const testEditRequest = () => {
  describe('User can edit open request', () => {
    it('should return 200 on successful signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginX)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 200 on successful created request ', (done) => {
      chai
        .request(app)
        .post('/api/v1/trips/returnTrip')
        .send({
          origin: 'Kigali',
          destination: 'Kampala',
          departureDate: '2023-01-11',
          returnDate: '2023-01-15',
          reason: 'Having fun',
          accommodation: 'Z campus'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message').that.equals('request created on success!');
          expect(res.body).to.have.property('status').that.equals('pending');
          done();
        });
    });
    it('should return 200 on an Empty update body .', (done) => {
      const requestId = 2;
      const path = `/api/v1/trips/edit/?requestId=${requestId}`;
      chai.request(app)
        .patch(path)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('Empty request body.');
          done();
        });
    });
    it('should return 200 on successful edit', (done) => {
      const requestId = 7;
      const path = `/api/v1/trips/edit/?requestId=${requestId}`;
      chai.request(app)
        .patch(path)
        .send({
          origin: 'Kigali',
          destination: 'Uganda',
          departureDate: '2020-04-20',
          returnDate: '2020-03-29',
          reason: 'Lets test it now now'

        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').that.equals('successfully updated');
          done();
        });
    });
    it('it should return 200 when a manager logs in', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'eugene.munyampundu@gmail.com',
          password: 'Niyonkuru@1'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message').that.equals('Successfully login');
          done();
        });
    });
    it('returns 200 if the request rejected/closed ', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/trips/reject?requestId=${7}`)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('message').equals('The request successfully rejected');
          done();
        });
    });
    it('it should return 200 on successful user signIn', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(mockData.loginX)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return 200 when trying to edit a closed request', (done) => {
      const requestId = 7;
      const path = `/api/v1/trips/edit/?requestId=${requestId}`;
      chai.request(app)
        .patch(path)
        .send(mockData.editRequest)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('error').that.equals('Sorry, the request was closed!');
          done();
        });
    });

    it('should return 404 on a not found request', (done) => {
      const requestId = 1000;
      const path = `/api/v1/trips/edit/?requestId=${requestId}`;
      chai.request(app)
        .patch(path)
        .send(mockData.editRequest)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').that.equals('request not found!');
          done();
        });
    });
    it('should return true if object is empty', (done) => {
      const userInfo = {};
      const isUserInfoEmpty = isObjectEmpty(userInfo);
      expect(isUserInfoEmpty).to.equal(true);
      done();
    });
  });
};
export default testEditRequest;
