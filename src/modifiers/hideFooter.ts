function hideFooter(element: HTMLElement) {
  element.querySelectorAll('.gist-meta').forEach((node: HTMLElement) => {
    if (node.parentNode != null) {
      node.parentNode.removeChild(node);
    }
  });

  // Get rid of the collapsed border from missing footer
  element.querySelectorAll('.gist-data').forEach((node: HTMLElement) => {
    if (node != null) {
      node.style.borderBottom = '0px';
    }
  });
  element.querySelectorAll('.gist-file').forEach((node: HTMLElement) => {
    if (node != null) {
      node.style.borderBottom = '1px solid #dddddd';
    }
  });
}

export default hideFooter;
