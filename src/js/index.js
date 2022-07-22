import { ALERT_MESSAGES, INPUT_NAME, LOTTO } from './constants.js';
import Lotto from './service/Lotto.js';
import LottoModal from './view/LottoModal.js';
import LottoWinningForm from './view/LottoWinningForm.js';
import LottoPurchaseSection from './view/LottoPurchaseSection.js';
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

const modal = document.querySelector('.modal');
const modalDataPlaceSet = modal.querySelectorAll('[data-place]');
const modalClose = modal.querySelector('.modal-close');
const revenueRate = modal.querySelector('#revenue-rate');
const resetButton = modal.querySelector('#reset');

const lottoPurchaseSection = new LottoPurchaseSection(purchaseSection, purchaseTextLabel);
const lotto = new Lotto(lottoWrapperList);
const lottoWinningForm = new LottoWinningForm(lottoWinningNumberForm);
const lottoModal = new LottoModal(modal, modalDataPlaceSet, revenueRate);

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

const renderLottoWinningForm = (e) => {
  e.preventDefault();

  try {
    const winningNumbers = new FormData(e.target).getAll(INPUT_NAME.WINNING_NUMBER);
    const bonusNumbers = new FormData(e.target).getAll(INPUT_NAME.BONUS_NUMBER);

    const combinedNumbers = [...winningNumbers, ...bonusNumbers];

    if (new Set(combinedNumbers).size !== LOTTO.WINNING_INPUT_SIZE) {
      throw new Error(ALERT_MESSAGES.DUPLICATE_WINNING_NUMBER_ERROR);
    }

    lotto.setScore(winningNumbers, bonusNumbers);
    const lottoNumberArrayList = lotto.getLottoRandomNumbers();
    lottoModal.renderModalContents(lotto, lottoNumberArrayList);

    lottoModal.openModal();
  } catch (error) {
    alert(error.message);
  }
};

const closeModal = () => {
  lottoModal.closeModal();
};

const reset = () => {
  closeModal();

  showToggleButton.checked = false;
  lottoPurchaseSection.resetPurchasedCount();
  lotto.resetLottoData();

  purchaseForm.reset();
  lottoWinningForm.hiddenForm();
  lottoWinningForm.resetForm();
};

purchaseForm.addEventListener('submit', renderLottoList);
showToggleButton.addEventListener('click', () => lotto.toggleLottoList(lotto));

winningInputWrapper.addEventListener('input', onChangeInputFocus);
lottoWinningNumberForm.addEventListener('submit', renderLottoWinningForm);

modalClose.addEventListener('click', closeModal);
winningInputWrapper.addEventListener('input', onChangeInputFocus);

resetButton.addEventListener('click', reset);
