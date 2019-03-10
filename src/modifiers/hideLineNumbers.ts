function hideLineNumbers(element: HTMLElement) {
  element.querySelectorAll('.js-line-number').forEach(node => {
    if (node.parentNode != null) {
      node.parentNode.removeChild(node);
    }
  });
}

export default hideLineNumbers;
