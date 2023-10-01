import { createElement, createFragment } from '../DOMHandler.js';

class TableBuilder {
  #createCell({ textContent, cellType = 'td', scope = 'col', row = 1, col = 1 }) {
    const $tableCell = createElement(cellType);
    $tableCell.textContent = textContent;
    $tableCell.setAttribute('rowspan', row);
    $tableCell.setAttribute('colspan', col);
    $tableCell.setAttribute('scope', scope);
    return $tableCell;
  }

  createTableHeader(headerList) {
    const $thead = createElement('thead');
    const $tr = createElement('tr');

    headerList.forEach((header) => {
      $tr.appendChild(this.#createCell({ cellType: 'th', ...header }));
    });

    $thead.appendChild($tr);
    return $thead;
  }

  createTableBody(list) {
    const $tbody = createElement('tbody');
    const $trFragment = createFragment();

    list.forEach((rows) => {
      const $tableCellFragment = document.createDocumentFragment();
      const $tr = createElement('tr');

      for (const rowItem in rows) {
        if (Object.hasOwn(rows, rowItem)) {
          const $tableCell = this.#createCell(rows[rowItem]);
          $tableCellFragment.appendChild($tableCell);
        }
      }

      $tr.appendChild($tableCellFragment);
      $trFragment.appendChild($tr);
    });

    $tbody.appendChild($trFragment);
    return $tbody;
  }
}

export default TableBuilder;
