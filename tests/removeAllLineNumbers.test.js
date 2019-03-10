// Note:
// Since the functions in index.ts are not exported, we use __get__ to grab them
// This comes from the babel rewire plugin setup in babelrc
// To modify a function use __Rewire__

// Must be require so we can re-require and override index on each pass
import removeAllLineNumbers from '../src/modifiers/removeAllLineNumbers.ts';

function generateMockElement() {
  const element = document.createElement('code');
  element.setAttribute('data-gist-hide-line-numbers', 'true');
  const lineNumberDIV = document.createElement('div');
  lineNumberDIV.classList.add('js-line-number');
  element.appendChild(lineNumberDIV);
  document.body.appendChild(element);
  return element;
}

test('removeAllLineNumbers', () => {
  const element = generateMockElement();
  expect(element.children[0].classList.contains('js-line-number')).toEqual(
    true,
  );
  removeAllLineNumbers(element);
  expect(element.children.length).toEqual(0);
});
