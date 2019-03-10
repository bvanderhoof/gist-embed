import hideLineNumbers from '../src/modifiers/hideLineNumbers.ts';

function generateMockElement() {
  const element = document.createElement('code');
  const lineNumberDIV = document.createElement('div');
  lineNumberDIV.classList.add('js-line-number');
  element.appendChild(lineNumberDIV);
  document.body.appendChild(element);
  return element;
}

test('hideLineNumbers', () => {
  const element = generateMockElement();
  expect(element.children[0].classList.contains('js-line-number')).toEqual(
    true,
  );
  hideLineNumbers(element);
  expect(element.children.length).toEqual(0);
});
