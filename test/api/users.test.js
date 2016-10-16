const request = require('supertest');
const expect = require('chai').expect;

const models = require('../../server/models');
const app = require('../../server/server');

describe('[Users]', () => {
  before((done) => {
    models.users.destroy({ where: {} })
      .then(() => done(null));
  });

  it('sign up a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({
        first_name: 'Alison',
        last_name: 'Johnson',
        email: 'alison@cc.cc',
        password: 'Pass123!Wow',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.deep.property('user.email', 'alison@cc.cc');
        done();
      });
  });

  it('cannot sign up if any inputs are empty', (done) => {
    request(app)
      .post('/api/users')
      .send({
        first_name: '',
        last_name: 'Johnson',
        email: 'alice@cc.cc',
        password: 'Pass123!Wow',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'All inputs are required.');
        done();
      });
  });

  it('cannot sign up a user with same email', (done) => {
    request(app)
      .post('/api/users')
      .send({
        first_name: 'Alison',
        last_name: 'Johnson',
        email: 'alison@cc.cc',
        password: 'Pass123!Wow',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'The email is already registered.');
        done();
      });
  });
});
