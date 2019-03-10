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

test('expect getAllGistEmbedDOMNodes to be called from index', () => {
  index.__Rewire__('getAllGistEmbedDOMNodes', jest.fn(() => [{}, {}]));
  index.__Rewire__('fetchJSONPForGistEmbedDOMNode', jest.fn(() => {}));
  index.__get__('init')();
  expect(index.__get__('getAllGistEmbedDOMNodes')).toHaveBeenCalledTimes(1);
});

test('expect fetchJSONPForGistEmbedDOMNode to be called from index', () => {
  index.__Rewire__('fetchJSONPForGistEmbedDOMNode', jest.fn(() => {}));
  addPlainGistEmbedDOMToBody();
  index.__get__('init')();
  expect(index.__get__('fetchJSONPForGistEmbedDOMNode')).toHaveBeenCalledTimes(
    1,
  );
});

test('expect getAllGistEmbedDOMNodes to return a node ', () => {
  addPlainGistEmbedDOMToBody();
  expect(index.__get__('getAllGistEmbedDOMNodes')().length).toEqual(1);
});

test('expect getAllGistEmbedDOMNodes to not return nodes', () => {
  expect(index.__get__('getAllGistEmbedDOMNodes')().length).toEqual(0);
});
