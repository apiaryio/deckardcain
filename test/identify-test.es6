
import {assert} from 'chai';
import {identify} from '../lib/deckardcain';


describe('API Blueprint', () => {
  describe('with FORMAT header', () => {
    const source = `
FORMAT: 1A

# /messages/{id}

## DELETE
+ Response 204
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('without FORMAT header but with any typical response', () => {
    const source = `
# /messages/{id}

## DELETE
+ Response 204
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('without FORMAT header or any typical response', () => {
    const source = `
# Data Structures API

## Data Structures

### Coupon Base (object)
+ redeem_by (number) - Date after which the coupon can no longer be redeemed
    `;

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });
});


describe('Legacy Apiary Blueprint', () => {
  describe('with arbitrary valid content', () => {
    const source = `
HOST: http://example.com/api-path

--- API Name ---

All Messages
POST /messages{?id,token,username}
> X-Brewery-Since: 1564
Sent Payload
< 200
< X-Brewery-Brand: Svijany
Received Payload
    `;

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });
});
