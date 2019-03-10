import caption from '../src/modifiers/caption.ts';

function generateMockElement() {
  const element = document.createElement('code');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  tbody.appendChild(tr);
  table.appendChild(tbody);
  element.appendChild(table);

  document.body.appendChild(element);
  return element;
}

test('caption', () => {
  const element = generateMockElement();
  const captionValue = 'This is a test caption';
  caption(element, captionValue);
  expect(element.querySelectorAll('table tbody tr').length).toEqual(2);
  expect(element.querySelectorAll('table tbody tr td')[1].innerHTML).toEqual(
    captionValue,
  );
});
