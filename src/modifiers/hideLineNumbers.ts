function hideLineNumbers(element: HTMLElement) {
  Array.from(element.querySelectorAll('.js-line-number')).forEach(node => {
    if (node.parentNode != null) {
      node.parentNode.removeChild(node);
    }
  });
}

export default hideLineNumbers;
