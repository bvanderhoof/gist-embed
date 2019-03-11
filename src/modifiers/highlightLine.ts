import getLineNumbers from '../utils/getLineNumbers';

function highlightLine(element: HTMLElement, lineRangeString: string) {
  const highlightLineNumbers = getLineNumbers(lineRangeString);

  // we need to set the line-data td to 100% so the highlight expands the whole line
  element.querySelectorAll('td.line-data').forEach((el: HTMLElement) => {
    el.style.width = '100%';
  });

  // find all .js-file-line tds (actual code lines) that match the highlightLines and add the highlight class
  element
    .querySelectorAll('.js-file-line')
    .forEach((el: HTMLElement, index: number) => {
      if (highlightLineNumbers.includes(index + 1)) {
        el.style.backgroundColor = 'rgb(255, 255, 204)';
      }
    });
}

export default highlightLine;
