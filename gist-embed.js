(function() {
  // Keep track of stylesheets added. Only append a new stylesheet if it doesn't exist
  const StylesheetURLs = new Set();
  // Prefix for fetching via JSONP
  const JSONP_CALLBACK_PREFIX = '_gistEmbedJSONP_';
  // Global counter for each JSONP called so we can append to prefix to create a unique JSONP callback
  let _jsonpCallbackIDCounter = 0;
  // URL prefix to get the JSONP result
  const GIST_URL_PREFIX = 'https://gist.github.com/';
  // The attribute we check on the DOM elements to grab the gist id
  const GIST_ID_ATTRIBUTE_NAME = 'data-gist-id';

  // document ready, call init
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

  // init function that runs on page load. Grabs all nodes and fetches JSONP for each and
  // swapping the content of the node with the response
  function init() {
    Array.from(getAllGistEmbedDOMNodes()).forEach(
      fetchJSONPForGistEmbedDOMNode
    );
  }

  // returns all dom nodes with attribute GIST_ID_ATTRIBUTE_NAME
  function getAllGistEmbedDOMNodes() {
    return document.querySelectorAll(`[${GIST_ID_ATTRIBUTE_NAME}]`);
  }

  // creates a unique callback for JSONP
  function generateJSONPCallbackPrefix() {
    ++_jsonpCallbackIDCounter;
    return `${JSONP_CALLBACK_PREFIX}${_jsonpCallbackIDCounter}`;
  }

  // Add a stylesheet to the DOM given a http url
  function appendStylesheet(stylesheetURL) {
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
  function getJSONP(gistID, callback) {
    const callbackName = generateJSONPCallbackPrefix();
    window[callbackName] = callback;

    const scriptEl = document.createElement('script');
    scriptEl.setAttribute(
      'src',
      `${GIST_URL_PREFIX}${gistID}.json?callback=${callbackName}`
    );
    document.body.appendChild(scriptEl);
  }

  // Fetch the JSONP for a given DOM Node
  function fetchJSONPForGistEmbedDOMNode(gistDOMNode) {
    const gistID = gistDOMNode.getAttribute(GIST_ID_ATTRIBUTE_NAME);

    function callback(response) {
      if (
        Boolean(response) &&
        Boolean(response.div) &&
        Boolean(response.stylesheet)
      ) {
        handleJSONPResponseForDOMNode(gistDOMNode, response);
      }
    }

    if (Boolean(gistID)) {
      getJSONP(gistID, callback);
    }
  }

  // From the JSONP response, add the stylesheet to the DOM and replace the DOM Node contents
  function handleJSONPResponseForDOMNode(gistDOMNode, response) {
    appendStylesheet(response.stylesheet);
    gistDOMNode.innerHTML = response.div;
  }
})();
