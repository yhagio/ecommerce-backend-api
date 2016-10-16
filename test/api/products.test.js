const request = require('supertest');
const expect = require('chai').expect;

const models = require('../../server/models');
const app = require('../../server/server');
let productId;

describe('[Products]', () => {
  before((done) => {
    models.products.destroy({ where: {} })
      .then(() => {
        const obj = {
          name: 'Cool Name',
          price: 15.00,
          description: 'Cool Product',
        };
        models.products
          .create(obj)
          .then(() => done(null));
      });
  });

  it('retrieve all the products', (done) => {
    request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        productId = res.body[0].id;
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].name).to.equal('Cool Name');
        done();
      });
  });

  it('retrieve single product', (done) => {
    request(app)
      .get(`/api/products/${productId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Cool Name');
        done();
      });
  });
});
