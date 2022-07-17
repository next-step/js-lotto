import { resultRowElement } from '../element/index.js';
import { RANK } from '../constant/index.js';

const resultTBodyData = (rankObj) =>
  Object.values(RANK)
    .filter((item) => item.KEY !== RANK.OUT.KEY)
    .map((item) => ({
      equalCount: item.EQUAL_COUNT_TEXT,
      prizeMoney: item.PRIZE_MONEY,
      winningTicketCount: `${rankObj[item.KEY]}개`,
    }))
    .reverse();

export const appendResultWinningCount = (rankObj) => {
  const $resultTbody = document.querySelector('#result-tbody');

  const tableBodyInnerElements = resultTBodyData(rankObj).reduce(
    (fragment, rowObj) => {
      fragment.append(resultRowElement(rowObj));
      return fragment;
    },
    document.createDocumentFragment()
  );

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
