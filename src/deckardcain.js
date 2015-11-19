const API_BLUEPRINT_HEADER = /^[\uFEFF]?(((VERSION:( |\t)2)|(FORMAT:( |\t)(X-)?1A))([\n\r]{1,2}|$))/i;
const API_BLUEPRINT_RESPONSE = /\+\s+(?:[Rr]esponse|[Rr]equest)\s+\d{3}/i;

const LEGACY_BLUEPRINT_TITLE = /\-{3} ([^\n\r]+ )?\-{3}([\n\r]{1,2}|$)/;

const SWAGGER_JSON = /^[\uFEFF]?{\n?[\n\t ]*["']swagger["']: ["']\d\.\d["'],/i;
const SWAGGER_YAML = /(?:^|\n)swagger: ["']\d\.\d["']\n/i;

/**
 * Identifies given source.
 * @param {string} source - The source code of API description file.
 * @returns {string|null} Media type of given file.
 */
function identify(source) {
  // Stay awhile and listen!
  if (source.match(API_BLUEPRINT_HEADER)) {
    // I spotted 'FORMAT: 1A' header, which gives us a clear clue that
    // the file is API Blueprint.
    return 'text/vnd.apiblueprint';
  }

  if (source.match(SWAGGER_YAML)) {
    // Indeed, we are dealing with Swagger file!
    return 'application/swagger+yaml';
  }

  if (source.match(SWAGGER_JSON)) {
    // Indeed, we are dealing with Swagger file!
    return 'application/swagger+json';
  }

  if (source.match(LEGACY_BLUEPRINT_TITLE)) {
    // I spotted '--- Sample Title ---' title. This looks like
    // we are dealing with the legacy Apiary Blueprint.
    return 'text/vnd.legacyblueprint';
  }

  if (source.match(API_BLUEPRINT_RESPONSE)) {
    // I can not see the '--- Sample Title ---' and at the same time
    // there is something like '+ Response 200' in the document, which is
    // pretty distinctive for API Blueprint.
    return 'text/vnd.apiblueprint';
  }

  return null;
}

export default {identify};
