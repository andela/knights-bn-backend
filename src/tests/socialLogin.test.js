import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import dotenv from 'dotenv';
dotenv.config();
process.env.NODE_ENV = 'test';
console.log(`environment: ${process.env.NODE_ENV}`);


chai.use(chaiHttp);
const { expect } = chai;
const googleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaXNoaW13ZXdpbDAwNUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJJc2hpbXdlIiwibGFzdE5hbWUiOiJULiBXaWxsaWFtIiwiaWF0IjoxNTgxNTE4MzM2fQ.xavOGLwbrH5WC8Zv8ncmW5adOHgvEUfNORInOStgtYQ';
const fcbkToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiaXNoaW13ZXdpbGxpYW1AeWFob28uZnIiLCJmaXJzdE5hbWUiOiJJc2hpbXdlIiwibGFzdE5hbWUiOiJXaWxsaWFtIiwiaWF0IjoxNTgxNTMyOTY2fQ.GniF5MHzLlcSJomWt9SwAgZ5p9nqyzkF_vcz4axBbUg';

describe('Test Google login', () => {
  it('should return 201 if it is a new user', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/test/google')
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  }),
  it('should return 200 if user already exists', () => {
    chai
      .request(app)
      .get('/api/v1/auth/test/google')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  }),
  it('should return a web token', () => {
    chai
      .request(app)
      .get('/api/v1/auth/test/google')
      .end((err, res) => {
        expect(res.body.token).to.equal(googleToken);
        done();
      });
  });
});
describe('Test Facebook login', () => {
    it('should return 201 if it is a new user', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/test/facebook')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    }),
    it('should return 200 if user already exists', () => {
      chai
        .request(app)
        .get('/api/v1/auth/test/facebook')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    }),
    it('should return a web token', () => {
      chai
        .request(app)
        .get('/api/v1/auth/test/facebook')
        .end((err, res) => {
          expect(res.body.token).to.equal(fcbkToken);
          done();
        });
    });
  });
