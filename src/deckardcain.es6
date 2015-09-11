
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

  if (source.match(API_BLUEPRINT_HEADER)) {
    // I spotted 'FORMAT: 1A' header. This is a clear clue that
    // the file is API Blueprint.
    return 'text/vnd.apiblueprint';
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

  // I do not know. Very strange item!
  return null;
}


export default {identify};
