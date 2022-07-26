import { RANK } from '../../domain/lotto/constants.js';
import ResultTableRow from '../../view/ResultTableRow.js';

export default function ResultTable(countByRank) {
  const $resultTable = document.querySelector('.result-table');
  const $tableBody = $resultTable.querySelector('tbody');

  const render = () => {
    const ranks = Object.keys(RANK);
    const tableRows = ranks.reduce(
      (html, rank) => html + ResultTableRow({ rank, matchCount: countByRank[rank] }),
      ''
    );

    $tableBody.innerHTML = tableRows;
  };

  render();
}
