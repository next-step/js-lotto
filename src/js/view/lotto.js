import { LOTTO, SELECTOR } from '../constants/index.js';
import { $, $all } from '../utils/dom.js';

const lottoAnnouncementMessage = (price) => {
  const lottoPurchaseCount = price / LOTTO.PRICE;

  return `${price}원을 입력하셨습니다, 로또를 ${lottoPurchaseCount}장 구매해주세요.`;
};

const lottoCurrentPurchasedStatusMessage = (lottos, price) => {
  const lottoPurchaseCount = price / LOTTO.PRICE;

  return `현재 구매:${lottos.length}개, 남은 개수: ${lottoPurchaseCount - lottos.length}개 `;
};

const lottoTemplate = (lottoNumbers) => `
<li data-cy='lotto-icon-list'>
  <span class="mx-1 text-4xl">🎟️ </span>
  <span class="lotto-detail js-lotto-detail-number none" data-cy="lotto-detail-number">${lottoNumbers.join(', ')}</span>
</li>
`;

export const getLottoPurchasePrice = () => Number($(SELECTOR.PURCHASE_PRICE_INPUT).value);

export const resetLottoPurchasePrice = () => {
  $(SELECTOR.PAYMENT_FORM).reset();
};

export const getLottoPurchasingNumberArray = () => {
  return Array.from($(SELECTOR.LOTTO_PURCHASING_NUMBER_INPUT_WRAPPER).children).map((input) => Number(input.value));
};

export const resetLottoPurchasingNumbers = () => {
  $(SELECTOR.LOTTO_SELF_BUYING_FORM).reset();
};

export const getLottoPurchasingBonusNumber = () => {
  return Number($(SELECTOR.LOTTO_PURCHASING_BONUS_NUMBER_INPUT).value);
};

export const getLottoWinningNumberArray = () => {
  return Array.from($(SELECTOR.WINNING_NUMBER_INPUT_WRAPPER).children).map((input) => Number(input.value));
};

const resetLottoWinningNumbers = () => {
  $(SELECTOR.LOTTO_RESULT_FORM).reset();
};

export const getLottoWinningBonusNumber = () => {
  return Number($(SELECTOR.WINNING_BONUS_NUMBER_INPUT).value);
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

const showLottoPurchaseContainer = () => {
  $(SELECTOR.LOTTO_PURCHASE_CONTAINER).classList.remove('none');
};

export const hideLottoPurchaseContainer = () => {
  $(SELECTOR.LOTTO_PURCHASE_CONTAINER).classList.add('none');
};

const showLottoAnnouncementMessage = (price) => {
  $(SELECTOR.LOTTO_ANNOUNCEMENT_MESSAGE).textContent = lottoAnnouncementMessage(price);
};

export const showCurrentPurchasedLottoStatus = (lottos, price) => {
  $(SELECTOR.LOTTO_CURRENT_PURCHASED_STATUS).textContent = lottoCurrentPurchasedStatusMessage(lottos, price);
};

export const toggleLottoNumber = () => {
  $(SELECTOR.LOTTO_ICON_WRAPPER).classList.toggle('flex-col');

  $all(SELECTOR.LOTTO_DETAIL_NUMBER).forEach((elem) => {
    elem.classList.toggle('none');
  });
};

const hideLottoResult = () => {
  hidePurchasedLotto();
  hideLottoResultForm();
};

export const renderLottoPurchaseContainer = (lottos, price) => {
  showCurrentPurchasedLottoStatus(lottos, price);
  showLottoPurchaseContainer();
  showLottoAnnouncementMessage(price);
  hideLottoResult();
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
  [...$all(SELECTOR.LOTTO_WINNING_COUNT)].forEach((row) => {
    const { rank } = row.dataset;
    // eslint-disable-next-line no-param-reassign
    row.textContent = `${winningCount[rank]}개`;
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
