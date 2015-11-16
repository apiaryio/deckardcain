import YAML from 'js-yaml';

const API_BLUEPRINT_HEADER = /^[\uFEFF]?(((VERSION:( |\t)2)|(FORMAT:( |\t)(X-)?1A))([\n\r]{1,2}|$))/i;
const API_BLUEPRINT_RESPONSE = /\+\s+Response\s+\d{3}/i;

const LEGACY_BLUEPRINT_TITLE = /\-{3} ([^\n\r]+ )?\-{3}([\n\r]{1,2}|$)/;


/**
 * Identifies given source.
 * @param {string} source - The source code of API description file.
 * @returns {string|null} Media type of given file.
 */
function identify(source) {
  // Stay awhile and listen!

  let identifiedType = null;

  try {
    const json = JSON.parse(source);

    // It looks like the source is a valid JSON file. I suspect it to
    // be a Swagger file.
    if (json.swagger) {
      // Indeed, we are dealing with Swagger file!
      identifiedType = 'application/swagger+json';
    }
  } catch (jsonException) {
    // Well ok, it's not a JSON...Maybe we're dealing with YAML file?
    try {
      const yaml = YAML.safeLoad(source);

      if (yaml.swagger) {
        // Indeed, we are dealing with Swagger file!
        identifiedType = 'application/swagger+yaml';
      }
    } catch (yamlException) {
      // Well ok I am sorry, it's not a Swaggerish
    }
  } finally {
    if (identifiedType === null) {
      if (source.match(API_BLUEPRINT_HEADER)) {
        // I spotted 'FORMAT: 1A' header, which gives us a clear clue that
        // the file is API Blueprint.
        identifiedType = 'text/vnd.apiblueprint';
      } else if (source.match(LEGACY_BLUEPRINT_TITLE)) {
        // I spotted '--- Sample Title ---' title. This looks like
        // we are dealing with the legacy Apiary Blueprint.
        identifiedType = 'text/vnd.legacyblueprint';
      } else if (source.match(API_BLUEPRINT_RESPONSE)) {
        // I can not see the '--- Sample Title ---' and at the same time
        // there is something like '+ Response 200' in the document, which is
        // pretty distinctive for API Blueprint.
        identifiedType = 'text/vnd.apiblueprint';
      }
    }

    return identifiedType;
  }
}


export default {identify};
