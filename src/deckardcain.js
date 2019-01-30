export const API_BLUEPRINT_HEADER = /^[\uFEFF]?(((VERSION:( |\t)2)|(FORMAT:( |\t)(X-)?1A))\s*?([\n\r]{1,2}|$))/i;
export const API_BLUEPRINT_LISTITEM = /[-\*\+]\s+(response|request|attributes?)/i;
export const API_BLUEPRINT_DATA = /#+\s+data structures?\s*\n/i;

export const LEGACY_BLUEPRINT_TITLE = /[-]{3}(?=( [^\n\r]+ | )[-]{3}([\n\r]{1,2}|[.]{0}))/i;

export const SWAGGER_JSON = /^[\uFEFF]?{[\s\S]*["']swagger["']\s*:\s*["']\d\.\d["'],?/i;
export const SWAGGER_YAML = /(?:^|\n)\s*swagger: ["']\d\.\d["']\n/i;

export const OPENAPI_JSON = /^[\uFEFF]?{[\s\S]*["']openapi["']\s*:\s*["']\d\.\d+.\d+["'],?/i;
export const OPENAPI_YAML = /^\s*(["']?)openapi\1\s*:\s*(["']?)\d\.\d+.\d+\2$/mi;

export const REFRACT_API_DESCRIPTION_ELEMENT_JSON = /[\uFEFF]?\n?\s*["']element["']\s*:\s*["']category["']/i;
export const REFRACT_API_DESCRIPTION_CLASS_JSON = /"meta"\s*:\s*\{\s*"classes"\s*:\s*\[\s*"api"\s*\]/i;
export const REFRACT_PARSE_RESULT_ELEMENT_JSON = /[\uFEFF]?\n?\s*["']element["']\s*:\s*["']parseResult["']/i;

export const REFRACT_API_DESCRIPTION_ELEMENT_YAML = /[\uFEFF]?\n?\s*element: ?["']category["']/i;
export const REFRACT_API_DESCRIPTION_CLASS_YAML = /\s*meta:\s+classes:\s+\-\s["']api["']/i;
export const REFRACT_PARSE_RESULT_ELEMENT_YAML = /[\uFEFF]?\n?\s*element: ?["']parseResult["']/i;

/**
 * Identifies given source.
 * @param {string} source - The source code of API description file.
 * @returns {string|null} Media type of given file.
 */
export function identify(source) {
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

  // see https://stackoverflow.com/questions/52541842/what-is-the-media-type-of-an-openapi-schema
  if (source.match(OPENAPI_YAML)) {
    return 'application/vnd.oai.openapi';
  }

  if (source.match(OPENAPI_JSON)) {
    return 'application/vnd.oai.openapi+json';
  }

  if (source.match(REFRACT_API_DESCRIPTION_ELEMENT_JSON) &&
      source.match(REFRACT_API_DESCRIPTION_CLASS_JSON) &&
      !source.match(REFRACT_PARSE_RESULT_ELEMENT_JSON)) {
    // File contains element `category` with class `api`, but
    // does not contain element `parseResult`
    // which would mean that file is `vnd.refract.parse-result
    return 'application/vnd.refract.api-description+json';
  }

  if (source.match(REFRACT_API_DESCRIPTION_ELEMENT_YAML) &&
      source.match(REFRACT_API_DESCRIPTION_CLASS_YAML) &&
      !source.match(REFRACT_PARSE_RESULT_ELEMENT_YAML)) {
    // File contains element `category` with class `api`, but
    // does not contain element `parseResult`
    // which would mean that file is `vnd.refract.parse-result
    return 'application/vnd.refract.api-description+yaml';
  }

  if (source.match(LEGACY_BLUEPRINT_TITLE)) {
    // Found '--- Sample Title ---' title which indicates legacy blueprint
    return 'text/vnd.legacyblueprint';
  }

  if (source.match(API_BLUEPRINT_LISTITEM) || source.match(API_BLUEPRINT_DATA)) {
    // Didn't find '--- Sample Title ---' and at the same time
    // there is something like '+ Response 200' in the document, which is
    // pretty distinctive for API Blueprint.
    return 'text/vnd.apiblueprint';
  }

  return null;
}


export default { identify };
