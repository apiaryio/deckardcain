const API_BLUEPRINT_HEADER = /^[\uFEFF]?(((VERSION:( |\t)2)|(FORMAT:( |\t)(X-)?1A))([\n\r]{1,2}|$))/i;
const API_BLUEPRINT_RESPONSE = /\+\s+(?:response|request)\s+\d{3}/i;

const LEGACY_BLUEPRINT_TITLE = /\-{3} ([^\n\r]+ )?\-{3}([\n\r]{1,2}|$)/;

const SWAGGER_JSON = /^[\uFEFF]?{\n?[\n\t ]*["']swagger["']: ?["']\d\.\d["'],/i;
const SWAGGER_YAML = /(?:^|\n)swagger: ["']\d\.\d["']\n/i;

const REFRACT_API_DESCRIPTION_ELEMENT = /[\uFEFF]?\n?\s*["']element["']: ?["']category["']/i;
const REFRACT_API_DESCRIPTION_CLASS = /(\s*["'][meta|classes]+["']: ?[\{|\[]){2}(\s*["'][api]+["']){1}/i;
const REFRACT_PARSE_RESULT_ELEMENT = /[\uFEFF]?\n?\s*["']element["']: ?["']parseResult["']/i;

/**
 * Identifies given source.
 * @param {string} source - The source code of API description file.
 * @returns {string|null} Media type of given file.
 */
function identify(source) {
  if (source.match(API_BLUEPRINT_HEADER)) {
    // There is 'FORMAT: 1A' present at the begining,
    // so we can say it is API Blueprint
    return 'text/vnd.apiblueprint';
  }

  if (source.match(SWAGGER_YAML)) {
    return 'application/swagger+yaml';
  }

  if (source.match(SWAGGER_JSON)) {
    return 'application/swagger+json';
  }

  if (source.match(REFRACT_API_DESCRIPTION_ELEMENT) &&
      source.match(REFRACT_API_DESCRIPTION_CLASS) &&
      !source.match(REFRACT_PARSE_RESULT_ELEMENT)) {
    // File contains element `category` with class `api`, but
    // does not contain element `parseResult`
    // which would mean that file is `vnd.refract.parse-result
    return 'application/vnd.refract.api-description';
  }

  if (source.match(LEGACY_BLUEPRINT_TITLE)) {
    // Found '--- Sample Title ---' title which indicates legacy blueprint
    return 'text/vnd.legacyblueprint';
  }

  if (source.match(API_BLUEPRINT_RESPONSE)) {
    // Didn't find '--- Sample Title ---' and at the same time
    // there is something like '+ Response 200' in the document, which is
    // pretty distinctive for API Blueprint.
    return 'text/vnd.apiblueprint';
  }

  return null;
}

export default {identify};
