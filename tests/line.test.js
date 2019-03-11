import line from '../src/modifiers/line.ts';

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

function testLinesReturnedMatchRange(element, indexArr) {
  element.querySelectorAll('table tbody tr').forEach((tr, index) => {
    expect(tr.querySelector('td').getAttribute('data-line-number')).toEqual(
      indexArr[index],
    );
  });
}

test('line single', () => {
  const element = generateMockElement(10);
  line(element, '2');
  expect(element.querySelectorAll('table tbody tr').length).toEqual(1);
  testLinesReturnedMatchRange(element, ['2']);
});

test('line commas', () => {
  const element = generateMockElement(10);
  line(element, '2,3,4');
  expect(element.querySelectorAll('table tbody tr').length).toEqual(3);
  testLinesReturnedMatchRange(element, ['2', '3', '4']);
});

test('line range', () => {
  const element = generateMockElement(10);
  line(element, '1-10');
  expect(element.querySelectorAll('table tbody tr').length).toEqual(10);
  testLinesReturnedMatchRange(element, [
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
  line(element, '2,3,4,5-7');
  expect(element.querySelectorAll('table tbody tr').length).toEqual(6);
  testLinesReturnedMatchRange(element, ['2', '3', '4', '5', '6', '7']);
});
