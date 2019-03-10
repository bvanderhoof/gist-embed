// Note:
// Since the functions in index.ts are not exported, we use __get__ to grab them
// This comes from the babel rewire plugin setup in babelrc
// To modify a function use __Rewire__

import index from '../src/index.ts';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
  __rewire_reset_all__();
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
  expect(generateJSONPCallbackPrefix()).toEqual('_gistEmbedJSONP_1');
  expect(generateJSONPCallbackPrefix()).toEqual('_gistEmbedJSONP_2');
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
