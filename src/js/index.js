import { ALERT_MESSAGES, LOTTO } from './constants.js';
import LottoPurchaseSection from './service/LottoPurchaseSection.js';
import Lotto from './service/Lotto.js';
import LottoWinningForm from './service/LottoWinningForm.js';
import { dividedLottoCount, hasRemainderPrice } from './calculation.js';

const purchaseForm = document.querySelector('#purchase-form');
const purchaseInput = purchaseForm.querySelector('input[name=purchasePrice]');

const purchaseSection = document.querySelector('#purchase-section');
const purchaseTextLabel = purchaseSection.querySelector('.purchase-label');
const showToggleButton = purchaseSection.querySelector('.lotto-numbers-toggle-button');
const lottoWrapperList = purchaseSection.querySelector('#lotto-wrapper-list');

const lottoWinningNumberForm = document.querySelector('#lotto-winning-number-form');
const winningInputWrapper = lottoWinningNumberForm.querySelector('#winning-input-wrapper');
const bonusInput = lottoWinningNumberForm.querySelector('input[name=bonus-number]');

const lottoPurchaseSection = new LottoPurchaseSection(purchaseSection, purchaseTextLabel);
const lotto = new Lotto(lottoWrapperList);
const lottoWinningForm = new LottoWinningForm(lottoWinningNumberForm);

const renderLottoList = (e) => {
  e.preventDefault();

  if (lottoPurchaseSection.isAlreadyExistList()) return;

  try {
    const price = parseInt(purchaseInput.value, 10);

    if (hasRemainderPrice(price)) {
      throw new Error(ALERT_MESSAGES.LOTTO_UNIT_ERROR);
    }

    lottoPurchaseSection.renderPurchasedCount(dividedLottoCount(price));

    lotto.createLottoList(dividedLottoCount(price));
    lotto.renderCreatedLottoList();
    lottoWinningForm.showForm();
  } catch (error) {
    purchaseInput.value = '';
    alert(error.message);
  }
};

const onChangeInputFocus = (e) => {
  const { value, nextElementSibling } = e.target;

  if (value.length < LOTTO.MAX_INPUT_LENGTH) return;

  if (!nextElementSibling) {
    bonusInput.focus();
    return;
  }

  nextElementSibling.focus();
};

purchaseForm.addEventListener('submit', renderLottoList);
showToggleButton.addEventListener('click', (e) => lotto.toggleLottoList(e, lotto));

winningInputWrapper.addEventListener('input', onChangeInputFocus);
