import highlightLine from '../src/modifiers/highlightLine.ts';

function generateMockElement(count) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  for (let i = 1; i <= count; i++) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.classList.add('js-file-line');
    td.setAttribute('data-line-number', `${i}`);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  const element = document.createElement('code');
  element.appendChild(table);
  document.body.appendChild(element);

  return element;
}

function testLinesAreHighlighted(element, indexArr) {
  element.querySelectorAll('table tbody tr').forEach((tr, index) => {
    if (indexArr.includes(`${index + 1}`) === true) {
      expect(tr.querySelector('td').style.backgroundColor).toEqual(
        'rgb(255, 255, 204)',
      );
    } else {
      expect(tr.querySelector('td').style.backgroundColor).toBeFalsy();
    }
  });
}

test('line single', () => {
  const element = generateMockElement(10);
  highlightLine(element, '2');
  testLinesAreHighlighted(element, ['2']);
});

test('line commas', () => {
  const element = generateMockElement(10);
  highlightLine(element, '2,3,4');
  testLinesAreHighlighted(element, ['2', '3', '4']);
});

test('line range', () => {
  const element = generateMockElement(10);
  highlightLine(element, '1-10');
  testLinesAreHighlighted(element, [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]);
});

test('line range and commas', () => {
  const element = generateMockElement(10);
  highlightLine(element, '2,3,4,5-7');
  testLinesAreHighlighted(element, ['2', '3', '4', '5', '6', '7']);
});

test('line range all', () => {
  const element = generateMockElement(10);
  highlightLine(element, '2-');
  testLinesAreHighlighted(element, [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
  ]);
});
