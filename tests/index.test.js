// Note:
// Since the functions in index.ts are not exported, we use __get__ to grab them
// This comes from the babel rewire plugin setup in babelrc
// To modify a function use __Rewire__

// Must be require so we can re-require and override index on each pass
let index = require('../src/index.ts');
let hideLineNumbers = require('../src/modifiers/hideLineNumbers.ts');

const JSONP_CALLBACK_PREFIX = '_gistEmbedJSONP';
const MOCK_RESPONSE = {
  div: 'content',
  stylesheet: 'https://www.github.com/main.css',
};
const MOCK_ERROR_RESPONSE = null;

function generateMockElement() {
  const gistID = '1';
  const element = document.createElement('code');
  element.setAttribute('data-gist-id', gistID);
  return element;
}

beforeEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks().resetModules();
  __rewire_reset_all__();
  jest.mock('../src/modifiers/hideLineNumbers.ts');
  // Re-require before each test so we reset private scope variables
  index = require('../src/index.ts');
  hideLineNumbers = require('../src/modifiers/hideLineNumbers.ts');
});

function addPlainGistEmbedDOMToBody() {
  document.body.innerHTML = '<code data-gist-id="123"/>';
}

function getFN(fnName) {
  return index.__get__(fnName);
}

function rewireFn(fnName, value) {
  return index.__Rewire__(fnName, value);
}

test('expect getAllGistEmbedDOMNodes to be called from index', () => {
  rewireFn('getAllGistEmbedDOMNodes', jest.fn(() => [{}, {}]));
  rewireFn('fetchJSONPForGistEmbedDOMNode', jest.fn(() => {}));
  getFN('init')();
  expect(getFN('getAllGistEmbedDOMNodes')).toHaveBeenCalledTimes(1);
});

test('expect fetchJSONPForGistEmbedDOMNode to be called from index', () => {
  rewireFn('fetchJSONPForGistEmbedDOMNode', jest.fn(() => {}));
  addPlainGistEmbedDOMToBody();
  getFN('init')();
  expect(getFN('fetchJSONPForGistEmbedDOMNode')).toHaveBeenCalledTimes(1);
});

test('expect getAllGistEmbedDOMNodes to return a node ', () => {
  addPlainGistEmbedDOMToBody();
  expect(getFN('getAllGistEmbedDOMNodes')().length).toEqual(1);
});

test('expect getAllGistEmbedDOMNodes to not return nodes', () => {
  expect(getFN('getAllGistEmbedDOMNodes')().length).toEqual(0);
});

test('generateJSONPCallbackPrefix returns incremented values', () => {
  const generateJSONPCallbackPrefix = getFN('generateJSONPCallbackPrefix');
  expect(generateJSONPCallbackPrefix()).toEqual(`${JSONP_CALLBACK_PREFIX}_1`);
  expect(generateJSONPCallbackPrefix()).toEqual(`${JSONP_CALLBACK_PREFIX}_2`);
});

test('appendStylesheet appends if not exists', () => {
  const appendStylesheet = getFN('appendStylesheet');
  const mainCSSURL = 'https://www.github.com/main.css';
  const main2CSSURL = 'https://www.github.com/main2.css';

  // First time append adds it
  appendStylesheet(mainCSSURL);
  let linkTags = document.querySelectorAll('link');
  expect(linkTags.length).toEqual(1);
  expect(linkTags[0].getAttribute('href')).toEqual(mainCSSURL);

  // Second time append same url doesn't add it
  appendStylesheet(mainCSSURL);
  linkTags = document.querySelectorAll('link');
  expect(linkTags.length).toEqual(1);

  // Third time append different url adds it
  appendStylesheet(main2CSSURL);
  linkTags = document.querySelectorAll('link');
  expect(linkTags[1].getAttribute('href')).toEqual(main2CSSURL);
  expect(linkTags.length).toEqual(2);
});

test('getJSONP', () => {
  const getJSONP = getFN('getJSONP');
  const gistID = '1';
  const callback = jest.fn();

  getJSONP(gistID, callback);
  let scriptTags = document.querySelectorAll('script');
  expect(scriptTags.length).toEqual(1);
  expect(scriptTags[0].src).toEqual(
    `https://gist.github.com/1.json?callback=${JSONP_CALLBACK_PREFIX}_1`,
  );
  expect(window[`${JSONP_CALLBACK_PREFIX}_1`]).toBeTruthy();
});

test('fetchJSONPForGistEmbedDOMNode', () => {
  const fetchJSONPForGistEmbedDOMNode = getFN('fetchJSONPForGistEmbedDOMNode');
  rewireFn('getJSONP', jest.fn((_, cb) => cb(MOCK_RESPONSE)));
  const getJSONP = getFN('getJSONP');
  rewireFn('handleGetJSONPResponse', jest.fn());
  const handleGetJSONPResponse = getFN('handleGetJSONPResponse');
  const element = generateMockElement();

  fetchJSONPForGistEmbedDOMNode(element);
  expect(getJSONP).toBeCalledTimes(1);
  expect(handleGetJSONPResponse).toBeCalledWith(element, MOCK_RESPONSE);
});

test('handleGetJSONPResponse success', () => {
  const handleGetJSONPResponse = getFN('handleGetJSONPResponse');
  rewireFn('updateDOMNodeWithGistContent', jest.fn());
  const updateDOMNodeWithGistContent = getFN('updateDOMNodeWithGistContent');
  const element = generateMockElement();

  handleGetJSONPResponse(element, MOCK_RESPONSE);
  expect(updateDOMNodeWithGistContent).toBeCalledWith(
    element,
    MOCK_RESPONSE.stylesheet,
    MOCK_RESPONSE.div,
  );
});

test('handleGetJSONPResponse error', () => {
  const handleGetJSONPResponse = getFN('handleGetJSONPResponse');
  rewireFn('updateDOMNodeWithGistContent', jest.fn());
  const updateDOMNodeWithGistContent = getFN('updateDOMNodeWithGistContent');
  const element = generateMockElement();
  document.body.appendChild(element);

  // Test error handling
  handleGetJSONPResponse(element, MOCK_ERROR_RESPONSE);
  expect(updateDOMNodeWithGistContent).not.toBeCalled();
  expect(document.querySelector('code').innerHTML).toEqual(
    'Error fetching gist',
  );
});

test('updateDOMNodeWithGistContent', () => {
  const updateDOMNodeWithGistContent = getFN('updateDOMNodeWithGistContent');
  rewireFn('modify', jest.fn());
  const modify = getFN('modify');
  const element = generateMockElement();
  document.body.appendChild(element);

  updateDOMNodeWithGistContent(
    element,
    MOCK_RESPONSE.stylesheet,
    MOCK_RESPONSE.div,
  );
  expect(document.querySelector('code').innerHTML).toEqual(MOCK_RESPONSE.div);
  expect(document.querySelector('link').getAttribute('href')).toEqual(
    MOCK_RESPONSE.stylesheet,
  );
  expect(modify).toBeCalledWith(element);
});

test('modify', () => {
  const modify = getFN('modify');
  const element = generateMockElement();
  element.setAttribute('data-gist-hide-line-numbers', 'true');
  document.body.appendChild(element);

  modify(element);

  expect(hideLineNumbers.default).toBeCalledWith(element);
});
