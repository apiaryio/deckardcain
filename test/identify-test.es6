
import * as fs from 'fs';

import {assert} from 'chai';
import {identify} from '../lib/deckardcain';


describe('API Blueprint', () => {
  const path = `${__dirname}/apiblueprint-fixtures/`;

  describe('with FORMAT header', () => {
    const fixture = path + 'with-format-header.apib';
    const source = fs.readFileSync(fixture, 'utf8');

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('without FORMAT header but with any typical response', () => {
    const fixture = path + 'with-typical-response.apib';
    const source = fs.readFileSync(fixture, 'utf8');

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('without FORMAT header or any typical response', () => {
    const fixture = path + 'unidentifiable.apib';
    const source = fs.readFileSync(fixture, 'utf8');

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });
});


describe('Legacy Apiary Blueprint', () => {
  const path = `${__dirname}/legacyblueprint-fixtures/`;

  describe('with arbitrary valid content', () => {
    const fixture = path + 'arbitrary.apib';
    const source = fs.readFileSync(fixture, 'utf8');

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });
});
