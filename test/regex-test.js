import {assert} from 'chai';
import {API_BLUEPRINT_HEADER, API_BLUEPRINT_RESPONSE, LEGACY_BLUEPRINT_TITLE, SWAGGER_JSON, SWAGGER_YAML, REFRACT_API_DESCRIPTION_ELEMENT_JSON, REFRACT_API_DESCRIPTION_CLASS_JSON, REFRACT_PARSE_RESULT_ELEMENT_JSON, REFRACT_API_DESCRIPTION_ELEMENT_YAML, REFRACT_API_DESCRIPTION_CLASS_YAML, REFRACT_PARSE_RESULT_ELEMENT_YAML} from '../src/deckardcain';


var safe = require('safe-regex');


describe('API Blueprint', () => {
  it('test API_BLUEPRINT_HEADER', () => {
    assert.isTrue(safe(API_BLUEPRINT_HEADER));
  });
  it('test API_BLUEPRINT_RESPONSE', () => {
    assert.isTrue(safe(API_BLUEPRINT_RESPONSE));
  });  
  it('test LEGACY_BLUEPRINT_TITLE', () => {
    assert.isTrue(safe(LEGACY_BLUEPRINT_TITLE));
  });    
});
describe('Swagger', () => {
  it('test SWAGGER_JSON', () => {
    assert.isTrue(safe(SWAGGER_JSON));
  });
  it('test SWAGGER_YAML', () => {
    assert.isTrue(safe(SWAGGER_YAML));
  });  
});
describe('Refract', () => {
  it('test REFRACT_API_DESCRIPTION_ELEMENT_JSON', () => {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_ELEMENT_JSON));
  });  
  it('test REFRACT_API_DESCRIPTION_CLASS_JSON', () => {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_CLASS_JSON));
  });  
  it('test REFRACT_PARSE_RESULT_ELEMENT_JSON', () => {
    assert.isTrue(safe(REFRACT_PARSE_RESULT_ELEMENT_JSON));
  });  
  it('test REFRACT_API_DESCRIPTION_ELEMENT_YAML', () => {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_ELEMENT_YAML));
  });  
  it('test REFRACT_API_DESCRIPTION_CLASS_YAML', () => {
    assert.isTrue(safe(REFRACT_API_DESCRIPTION_CLASS_YAML));
  });  
  it('test REFRACT_PARSE_RESULT_ELEMENT_YAML', () => {
    assert.isTrue(safe(REFRACT_PARSE_RESULT_ELEMENT_YAML));
  });
});
