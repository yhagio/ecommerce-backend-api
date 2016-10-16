// const request = require('supertest');
const expect = require('chai').expect;

const helpers = require('../../server/utils/helpers');

describe('[Helpers] Unit Test - validateStringLength', () => {
  it('returns give error if input length > limit', () => {
    const error = helpers.validateStringLength('Hello World', 5);
    expect(error).to.equal('* Cannot be more than 5 characters');
  });

  it('returns error if input is empty', () => {
    const error = helpers.validateStringLength('', 5);
    expect(error).to.equal('* Cannot be empty');
  });

  it('returns empty string if there is no error', () => {
    const error = helpers.validateStringLength('Hello World!', 20);
    expect(error).to.equal('');
  });
});

describe('[Helpers] Unit Test - validatePassword', () => {
  it('returns error if length > 50 chars');
  it('returns error if length < 8 chars');
  it('returns error if missing a symbol');
  it('returns error if missing a number');
  it('returns error if missing a lowercase');
  it('returns error if missing a uppercase');
  it('returns no error if it is in correct format');
});

describe('[Helpers] Unit Test - validateEmail', () => {
  it('returns error if it is longer than 40 chars');
  it('returns error if it is not in correact format');
  it('returns no error if it is in correct foramt');
});
