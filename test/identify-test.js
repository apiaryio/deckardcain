import dedent from 'dedent';
import {assert} from 'chai';
import {identify} from '../src/deckardcain';


describe('API Blueprint', () => {
  describe('with FORMAT header', () => {
    const source = dedent`
      FORMAT: 1A

      # /messages/{id}

      ## DELETE
      + Response 204
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('with FORMAT header using X-1A', () => {
    const source = dedent`
      FORMAT: X-1A
      HOST: http://api.example.com/

      # Example API
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });


  describe('with UTF8 BOM and FORMAT header', () => {
    const source = dedent`\uFEFF
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
    const source = dedent`\r
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
    const source = dedent`
      # /messages/{id}

      ## DELETE
      + Response 204
    `;

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('with no new line at the end', () => {
    const source = 'FORMAT: 1A';

    it('is identified as API Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.apiblueprint');
    });
  });

  describe('without FORMAT header or any typical response', () => {
    const source = dedent`
      # Data Structures API

      ## Data Structures

      ### Coupon Base (object)
      + redeem_by (number) - Date after which the coupon can no longer be redeemed
    `;

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });

  describe('Plain text file with arbitrary content', () => {
    const source = 'Beware! Beyond lies mortal danger for the likes of you!';

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });
});


describe('Legacy Apiary Blueprint', () => {
  describe('with arbitrary valid content', () => {
    const source = dedent`
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
    const source = 'HOST: http://example.com/api-path\n--- ---\n';

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });

  describe('with UTF8 BOM and arbitrary valid content', () => {
    const source = dedent`\uFEFF
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

  describe('with no new line at the end', () => {
    const source = 'HOST: http://example.com/api-path\n--- Sample API ---';

    it('is identified as legacy Apiary Blueprint', () => {
      assert.equal(identify(source), 'text/vnd.legacyblueprint');
    });
  });
});


describe('Swagger', () => {

  describe('Swagger file with arbitrary valid JSON content', () => {
    const source = dedent`
      {
        "swagger": "2.0",
        "host": "example.com",
        "basePath": "/api",
        "schemes": ["http"],
        "paths": {}
      }
    `;

    it('is identified as Swagger', () => {
      assert.equal(identify(source), 'application/swagger+json');
    });
  });

  describe('Swagger file with arbitrary valid JSON content, but swagger key isn\'t first', () => {
    const source = dedent`
      {
        "host": "example.com",
        "basePath": "/api",
        "schemes": ["http"],
        "paths": {},
        "swagger": "2.0"
      }
    `;

    it('is identified as Swagger', () => {
      assert.equal(identify(source), 'application/swagger+json');
    });
  });

  describe('Swagger file with arbitrary valid YAML content', () => {
    const source = dedent`
      ---
      # comment
      swagger: "2.0"
      host: example.com
      basePath: /v1
      schemes:
        - http
    `;

    it('is identified as Swagger', () => {
      assert.equal(identify(source), 'application/swagger+yaml');
    });
  });

  describe('Indented Swagger file with arbitrary valid YAML content', () => {
    const source = `
      ---
      # comment
      swagger: "2.0"
      host: example.com
      basePath: /v1
      schemes:
        - http
    `;

    it('is identified as Swagger', () => {
      assert.equal(identify(source), 'application/swagger+yaml');
    });
  });

  describe('YAML file with arbitrary valid content', () => {
    const source = dedent`
      --- !clarkevans.com/^invoice
      invoice: 34843
      date   : 2001-01-23
      bill-to: &id001
          given  : Chris
          family : Dumars
          address:
              lines: |
                  458 Walkman Dr.
                  Suite #292
              city    : Royal Oak
              state   : MI
              postal  : 48046
      ship-to: *id001
      product:
          - sku         : BL394D
            quantity    : 4
            description : Basketball
            price       : 450.00
          - sku         : BL4438H
            quantity    : 1
            description : Super Hoop
            price       : 2392.00
      tax  : 251.42
      total: 4443.52
      comments: >
          Late afternoon is best.
          Backup contact is Nancy
          Billsmer @ 338-4338.
      `;

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });

  describe('GeoJSON file with arbitrary valid content', () => {
    const source = dedent`
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [125.6, 10.1]
        },
        "properties": {
          "name": "Dinagat Islands"
        }
      }
    `;

    it('is not identified', () => {
      assert.equal(identify(source), null);
    });
  });

  describe('Something that is Swagger but contains Blueprint stuff', () => {
    const sources = [
      '{"swagger":"2.0","content":"--- Ha ha ha ---"}',
      '{"swagger":"2.0","content":"+ Response 200"}'
    ];

    it('is identified as Swagger', () => {
      sources.forEach((source) => {
        assert.equal(identify(source), 'application/swagger+json');
      });

    });
  })
});


describe('Refract API Description namespace', () => {
  describe('JSON file with arbitrary content', () => {
    const sources = [
      dedent`
      {
        "element": "category",
        "meta": {
          "classes": [
            "api"
          ]
        }
      }`,
      dedent`
      {
        "meta": {
          "classes": [
            "api"
          ]
        },
        "element": "category"
      }`,
      '{"element":"category","meta":{"classes":["api"]}}'
    ];

    it('is identified as Refract in JSON format', () => {
      sources.forEach((source) => {
        assert.equal(identify(source), 'application/vnd.refract.api-description+json');
      });
    });
  });

  describe('JSON file with parseResult namespace', () => {
    const sources = [
      '{"element":"parseResult","meta":{},"attributes":{},"content":[{"element":"category","meta":{"classes":["api"],"title":"DescriptionExample"}}]}'
    ];

    it('isn\'t identified as Refract', () => {
      sources.forEach((source) => {
        assert.notEqual(identify(source), 'application/vnd.refract.api-description+json');
      });
    });
  });

  describe('YAML file with arbitrary content', () => {
    const sources = [
      dedent`
        element: "category"
        meta:
          classes:
            - "api"
        `
      ,
      dedent`
        meta:
          classes:
            - "api"
        element: "category"
      `
    ];

    it('is identified as Refract in YAML format', () => {
      sources.forEach((source) => {
        assert.equal(identify(source), 'application/vnd.refract.api-description+yaml');
      });
    });
  });

  describe('YAML file with parseResult namespace', () => {
    const sources = [
      dedent`
        element: "parseResult"
        meta: {}
        attributes: {}
        content:
          -
            element: "category"
            meta:
              classes:
                - "api"
              title: "DescriptionExample"
      `
    ];

    it('isn\'t identified as Refract', () => {
      sources.forEach((source) => {
        assert.notEqual(identify(source), 'application/vnd.refract.api-description+yaml');
      });
    });
  });
});
