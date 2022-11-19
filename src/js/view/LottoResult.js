import { LOTTO_PRICE } from '../util/Constant.js';
import { getLottoResults, getMyEarningRate, getMyPrizeAmount } from '../util/LottoResult.js';
import { getNumbers } from '../util/Util.js';
import { validateNumbers } from '../util/Validator.js';
import { MODAL_RESULT_TR, MODAL_RESULT_TR_COLUMN } from './Element.js';
import { $bonusNumber, $earningRate, $winningNumbers } from './Selector.js';

export const getMyLottoResult = (lottos = []) => {
  const inputWinningNumbers = Array.from($winningNumbers).map(($number) => $number.value);
  const inputBonusNumber = $bonusNumber.value;
  validateNumbers([...inputWinningNumbers, inputBonusNumber]);

  const winningNumbers = getNumbers(inputWinningNumbers);
  const bonusNumber = parseInt(inputBonusNumber);
  return getLottoResults(lottos, winningNumbers, bonusNumber);
};

export const updateLottoResult = (lottos = [], lottoResult) => {
  // 모듈 글자 렌더링하기
  const getSelector = (selectorName) => `${selectorName} > td${MODAL_RESULT_TR_COLUMN}:last-child`;
  const updateText = (selector, text) => (document.querySelector(selector).innerText = text);

  const keys = Object.keys(lottoResult);
  for (const key of keys) {
    const selector = getSelector(MODAL_RESULT_TR[key]);
    updateText(selector, lottoResult[key] + '개');
  }

  // 수익률 계산하기
  $earningRate.innerText = getMyEarningRate(lottos.length * LOTTO_PRICE, getMyPrizeAmount(lottoResult)) + '%';
};
