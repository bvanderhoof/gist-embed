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
