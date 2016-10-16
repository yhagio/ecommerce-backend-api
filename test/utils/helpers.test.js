// const request = require('supertest');
const expect = require('chai').expect;

const helpers = require('../../server/utils/helpers');

describe('[Helpers] Unit Test', () => {
  it('fn validateStringLength give error if input length > limit', () => {
    const error = helpers.validateStringLength('Hello World', 5);
    expect(error).to.equal('* Cannot be more than 5 characters');
  });

  it('fn validateStringLength gives error if input is empty', () => {
    const error = helpers.validateStringLength('', 5);
    expect(error).to.equal('* Cannot be empty');
  });

  it('fn validateStringLength return empty string if there is no error', () => {
    const error = helpers.validateStringLength('Hello World!', 20);
    expect(error).to.equal('');
  });
});

