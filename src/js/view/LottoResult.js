import { LOTTO_PRICE } from '../service/Constant.js';
import { getLottoResults, getMyEarningRate, getMyPrizeAmount } from '../service/LottoResult.js';
import { convertToNumbers } from '../util/Util.js';
import { validateNumbers } from '../util/Validator.js';
import { MODAL_RESULT_TR, MODAL_RESULT_TR_COLUMN } from './Element.js';
import { $bonusNumber, $earningRate, $winningNumbers } from './Selector.js';

/**
 *
 * @param {number[]} lottos
 * @returns {import('../service/LottoResult.js').LottoResult}
 */
export const getMyLottoResult = (lottos) => {
  const inputWinningNumbers = Array.from($winningNumbers).map(($number) => $number.value);
  const inputBonusNumber = $bonusNumber.value;
  validateNumbers([...inputWinningNumbers, inputBonusNumber]);

  const winningNumbers = convertToNumbers(inputWinningNumbers);
  const bonusNumber = Number(inputBonusNumber);
  return getLottoResults(lottos, winningNumbers, bonusNumber);
};

/**
 *
 * @param {number[]} lottos
 * @param {import('../service/LottoResult.js').LottoResult} lottoResult
 */
export const updateLottoResult = (lottos, lottoResult) => {
  // 모듈 글자 렌더링하기
  const getSelector = (selectorName) => `${selectorName} > td${MODAL_RESULT_TR_COLUMN}:last-child`;
  const updateText = (selector, text) => (document.querySelector(selector).innerText = text);

  Object.keys(lottoResult).forEach((key) => {
    const selector = getSelector(MODAL_RESULT_TR[key]);
    updateText(selector, lottoResult[key] + '개');
  });

  // 수익률 계산하기
  $earningRate.innerText = getMyEarningRate(lottos.length * LOTTO_PRICE, getMyPrizeAmount(lottoResult)) + '%';
};
