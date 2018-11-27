import { assert } from 'chai';
import safe from 'safe-regex';

import {
  API_BLUEPRINT_HEADER, API_BLUEPRINT_RESPONSE, LEGACY_BLUEPRINT_TITLE,
  SWAGGER_JSON, SWAGGER_YAML, REFRACT_API_DESCRIPTION_ELEMENT_JSON,
  REFRACT_API_DESCRIPTION_CLASS_JSON, REFRACT_PARSE_RESULT_ELEMENT_JSON,
  REFRACT_API_DESCRIPTION_ELEMENT_YAML, REFRACT_API_DESCRIPTION_CLASS_YAML,
  REFRACT_PARSE_RESULT_ELEMENT_YAML, OPENAPI_JSON, OPENAPI_YAML,
} from '../src/deckardcain';


describe('API Blueprint', function() {
  it('test API_BLUEPRINT_HEADER', function() {
    assert.isTrue(safe(API_BLUEPRINT_HEADER));
  });
  it('test API_BLUEPRINT_RESPONSE', function() {
    assert.isTrue(safe(API_BLUEPRINT_RESPONSE));
  });
  it('test LEGACY_BLUEPRINT_TITLE', function() {
    assert.isTrue(safe(LEGACY_BLUEPRINT_TITLE));
  });
});

describe('Swagger', function() {
  it('test SWAGGER_JSON', function() {
    assert.isTrue(safe(SWAGGER_JSON));
  });
  it('test SWAGGER_YAML', function() {
    assert.isTrue(safe(SWAGGER_YAML));
  });
});

describe('OpenAPI', function() {
  it('test OPENAPI_JSON', function() {
    assert.isTrue(safe(OPENAPI_JSON));
  });
  it('test OPENAPI_YAML', function() {
    assert.isTrue(safe(OPENAPI_YAML));
  });
});

describe('Refract', function() {
  it('test REFRACT_API_DESCRIPTION_ELEMENT_JSON', function() {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_ELEMENT_JSON));
  });
  it('test REFRACT_API_DESCRIPTION_CLASS_JSON', function() {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_CLASS_JSON));
  });
  it('test REFRACT_PARSE_RESULT_ELEMENT_JSON', function() {
    assert.isTrue(safe(REFRACT_PARSE_RESULT_ELEMENT_JSON));
  });
  it('test REFRACT_API_DESCRIPTION_ELEMENT_YAML', function() {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_ELEMENT_YAML));
  });
  it('test REFRACT_API_DESCRIPTION_CLASS_YAML', function() {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_CLASS_YAML));
  });
  it('test REFRACT_PARSE_RESULT_ELEMENT_YAML', function() {
    assert.isTrue(safe(REFRACT_PARSE_RESULT_ELEMENT_YAML));
  });
});
