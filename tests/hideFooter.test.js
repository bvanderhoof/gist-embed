import hideFooter from '../src/modifiers/hideFooter.ts';

function generateMockElement() {
  const element = document.createElement('code');
  element.setAttribute('data-gist-hide-footer', 'true');

  const footerDIV = document.createElement('div');
  footerDIV.classList.add('gist-meta');
  element.appendChild(footerDIV);

  const dataDIV = document.createElement('div');
  dataDIV.classList.add('gist-data');
  element.appendChild(dataDIV);

  const fileDIV = document.createElement('div');
  fileDIV.classList.add('gist-file');
  element.appendChild(fileDIV);

  document.body.appendChild(element);
  return element;
}

test('hideFooter', () => {
  const element = generateMockElement();
  expect(element.children[0].classList.contains('gist-meta')).toEqual(true);
  hideFooter(element);
  expect(element.querySelectorAll('.gist-meta').length).toEqual(0);
  expect(element.querySelector('.gist-data').style.borderBottom).toEqual('0px');
  expect(element.querySelector('.gist-file').style.borderBottom).toEqual(
    '1px solid #dddddd',
  );
});
