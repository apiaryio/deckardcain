
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

  describe('with UTF8 BOM and FORMAT header', () => {
    const source = `\uFEFF
FORMAT: 1A

# /messages/{id}

## DELETE
+ Response 204
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('with \\r line breaks and arbitrary valid content', () => {
    const source = `\r
FORMAT: 1A\r
\r
# /messages/{id}\r
\r
## DELETE\r
+ Response 204\r
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

  describe('with minimal valid content', () => {
    const source = `
HOST: http://example.com/api-path
--- ---
    `;

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });

  describe('with UTF8 BOM and arbitrary valid content', () => {
    const source = `\uFEFF
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

  describe('with \\r line breaks and arbitrary valid content', () => {
    const source = `\r
--- API Name ---\r
\r
All Messages\r
POST /messages{?id,token,username}\r
> X-Brewery-Since: 1564\r
Sent Payload\r
< 200\r
< X-Brewery-Brand: Svijany\r
Received Payload\r
    `;

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });
});
