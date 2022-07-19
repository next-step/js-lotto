import { resultRowElement } from '../element/index.js';

export const appendResultWinningCount = (tbodyData) => {
  const $resultTbody = document.querySelector('#result-tbody');

  const tableBodyInnerElements = tbodyData.reduce((fragment, rowObj) => {
    fragment.append(resultRowElement(rowObj));
    return fragment;
  }, document.createDocumentFragment());

  if ($resultTbody.hasChildNodes()) {
    $resultTbody.replaceChildren(tableBodyInnerElements);
    return;
  }

  $resultTbody.append(tableBodyInnerElements);
};

export const appendRateOfReturn = (rateOfReturn) => {
  const $rateOfReturn = document.querySelector('#rate-of-return');
  $rateOfReturn.textContent = rateOfReturn;
};
