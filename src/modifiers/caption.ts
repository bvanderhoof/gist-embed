function caption(element: HTMLElement, captionValue: string) {
  element.querySelectorAll('table tbody').forEach((node: HTMLElement) => {
    const row = document.createElement('tr');
    const captionTD = document.createElement('td');
    captionTD.style.padding = '10px !important';
    captionTD.style.borderBottom = '10px solid white';
    captionTD.style.backgroundColor = '#f9f9f9';
    captionTD.style.fontWeight = 'bold';
    captionTD.innerHTML = captionValue;

    const spacerTD = document.createElement('td');
    spacerTD.style.backgroundColor = '#f9f9f9';
    spacerTD.style.borderBottom = '10px solid white';

    row.appendChild(spacerTD);
    row.appendChild(captionTD);

    // Shift row to the front of it's children
    node.prepend(row);
  });
}

export default caption;
