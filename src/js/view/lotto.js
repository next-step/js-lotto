import { DOM_INDEX_WITH_WINNING_COUNT_MAPPER, SELECTOR } from '../constants/index.js';
import { $, $all } from '../utils/dom.js';

const lottoTemplate = (lottoNumbers) => `
<li data-cy='lotto-icon-list'>
  <span class="mx-1 text-4xl">🎟️ </span>
  <span class="lotto-detail js-lotto-detail-number none" data-cy="lotto-detail-number">${lottoNumbers.join(', ')}</span>
</li>
`;

export const getLottoPurchasePrice = () => Number($(SELECTOR.PURCHASE_PRICE_INPUT).value);

export const resetLottoPurchasePrice = () => {
  $(SELECTOR.PURCHASE_PRICE_INPUT).value = '';
};

export const getLottoWinningNumberArray = () => {
  return Array.from($(SELECTOR.WINNING_NUMBER_INPUT_WRAPPER).children).map((input) => Number(input.value));
};

export const getLottoBonusNumber = () => {
  return $(SELECTOR.BONUS_NUMBER_INPUT).value;
};

const resetLottoWinningNumbers = () => {
  $(SELECTOR.LOTTO_RESULT_FORM).reset();
};

const showPurchasedLotto = () => {
  $(SELECTOR.PURCHASED_LOTTO).classList.remove('none');
};

const hidePurchasedLotto = () => {
  $(SELECTOR.PURCHASED_LOTTO).classList.add('none');
};

const showLottoResultForm = () => {
  $(SELECTOR.LOTTO_RESULT_FORM).classList.remove('none');
};

const hideLottoResultForm = () => {
  $(SELECTOR.LOTTO_RESULT_FORM).classList.add('none');
};

export const showModal = () => {
  $(SELECTOR.MODAL).classList.add('open');
};

export const hideModal = () => {
  $(SELECTOR.MODAL).classList.remove('open');
};

export const toggleLottoNumber = () => {
  $(SELECTOR.LOTTO_ICON_WRAPPER).classList.toggle('flex-col');
  $all(SELECTOR.LOTTO_DETAIL_NUMBER).forEach((elem) => {
    elem.classList.toggle('none');
  });
};

const renderLottoPurchaseCountText = (count) => {
  $(SELECTOR.LOTTO_PURCHASE_COUNT_TEXT).textContent = count;
};

const renderLottoIcons = (lottoNumbersArray) => {
  $(SELECTOR.LOTTO_ICON_WRAPPER).innerHTML = lottoNumbersArray.map(lottoTemplate).join('');
};

export const renderLottoResult = (count, lottoNumbersArray) => {
  renderLottoPurchaseCountText(count);
  renderLottoIcons(lottoNumbersArray);

  showPurchasedLotto();
  showLottoResultForm();
};

export const renderResultForm = (winningCount, rateOfReturn) => {
  [...$all(SELECTOR.LOTTO_WINNING_COUNT)].forEach((row, index) => {
    // eslint-disable-next-line no-param-reassign
    row.textContent = `${winningCount[DOM_INDEX_WITH_WINNING_COUNT_MAPPER[index]]}개`;
  });

  $(SELECTOR.RATE_OF_RETURN).textContent = `당신의 총 수익률은 ${rateOfReturn}%입니다.`;
};

export const resetView = (initCount, initLottoNumbersArray, initRateOfReturn, initWinningCount) => {
  renderLottoResult(initCount, initLottoNumbersArray);
  renderResultForm(initRateOfReturn, initWinningCount);

  resetLottoPurchasePrice();
  resetLottoWinningNumbers();

  hideModal();
  hidePurchasedLotto();
  hideLottoResultForm();
};
