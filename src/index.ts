// Keep track of stylesheets added. Only append a new stylesheet if it doesn't exist
const StylesheetURLs: Set<string> = new Set();
// Prefix for fetching via JSONP
const JSONP_CALLBACK_PREFIX: string = '_gistEmbedJSONP_';
// Global counter for each JSONP called so we can append to prefix to create a unique JSONP callback
let _jsonpCallbackIDCounter: number = 0;
// URL prefix to get the JSONP result
const GIST_URL_PREFIX: string = 'https://gist.github.com/';
// The attribute we check on the DOM elements to grab the gist id
const GIST_ID_ATTRIBUTE_NAME: string = 'data-gist-id';

type GistJSONResponse =
  | {
      div?: string | undefined;
      stylesheet?: string | undefined;
    }
  | null
  | undefined;

// document ready, call init
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

// init function that runs on page load. Grabs all nodes and fetches JSONP for each and
// swapping the content of the node with the response
function init() {
  Array.from(getAllGistEmbedDOMNodes()).forEach(fetchJSONPForGistEmbedDOMNode);
}

// returns all dom nodes with attribute GIST_ID_ATTRIBUTE_NAME
function getAllGistEmbedDOMNodes(): NodeList {
  return document.querySelectorAll(`[${GIST_ID_ATTRIBUTE_NAME}]`);
}

// creates a unique callback for JSONP
function generateJSONPCallbackPrefix(): string {
  ++_jsonpCallbackIDCounter;
  return `${JSONP_CALLBACK_PREFIX}${_jsonpCallbackIDCounter}`;
}

// Add a stylesheet to the DOM given a http url
function appendStylesheet(stylesheetURL: string) {
  if (!StylesheetURLs.has(stylesheetURL)) {
    StylesheetURLs.add(stylesheetURL);
    const linkEl = document.createElement('link');
    linkEl.setAttribute('href', stylesheetURL);
    linkEl.setAttribute('type', 'text/css');
    linkEl.setAttribute('rel', 'stylesheet');
    document.body.appendChild(linkEl);
  }
}

// Simple getJSONP method that takes a gist id and callback
function getJSONP(
  gistID: string,
  callback: (response: GistJSONResponse) => void,
) {
  const callbackName = generateJSONPCallbackPrefix();
  window[callbackName] = callback;

  const scriptEl = document.createElement('script');
  scriptEl.setAttribute(
    'src',
    `${GIST_URL_PREFIX}${gistID}.json?callback=${callbackName}`,
  );
  document.body.appendChild(scriptEl);
}

// Fetch the JSONP for a given DOM Node
function fetchJSONPForGistEmbedDOMNode(gistDOMNode: HTMLElement) {
  const gistID = gistDOMNode.getAttribute(GIST_ID_ATTRIBUTE_NAME);

  if (gistID != null && gistID !== '') {
    getJSONP(gistID, function(response: GistJSONResponse) {
      handleGetJSONPResponse(gistDOMNode, response);
    });
  }
}

function handleGetJSONPResponse(
  gistDOMNode: HTMLElement,
  response: GistJSONResponse,
) {
  if (response == null || response.div == null || response.stylesheet == null) {
    gistDOMNode.innerHTML = 'Error fetching gist';
    return;
  }

  updateDOMNodeWithGistContent(gistDOMNode, response.stylesheet, response.div);
}

// From the JSONP response, add the stylesheet to the DOM and replace the DOM Node contents
function updateDOMNodeWithGistContent(
  gistDOMNode: HTMLElement,
  responseStylesheet: string,
  responseDIV: string,
) {
  appendStylesheet(responseStylesheet);
  // update
  gistDOMNode.innerHTML = responseDIV;
}
