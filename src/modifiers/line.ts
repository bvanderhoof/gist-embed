import getLineNumbers from '../utils/getLineNumbers';

function line(element: HTMLElement, lineRangeString: string) {
  const fileLineEls = element.querySelectorAll('.js-file-line');
  const lineNumbers = getLineNumbers(lineRangeString, fileLineEls.length);
  // find all trs containing code lines that don't exist in the line param
  fileLineEls.forEach((lineElement: HTMLElement, index) => {
    // If the line number does not exist in the lines we want to show list, remove it
    if (
      !lineNumbers.includes(index + 1) &&
      lineElement.parentNode != null &&
      lineElement.parentNode.parentNode != null
    ) {
      lineElement.parentNode.parentNode.removeChild(lineElement.parentNode);
    }
  });
}

export default line;
