import { isValidForNoAmount, isValidForExactAmount, isValidWinningNumbers } from './validators.js';
import LottoModel from './models/LottoTicket.js';
import {
  MESSAGE_FOR_EMPTY_VALUE,
  MESSAGE_FOR_INVALID_UNIT_VALUE,
  LOTTO_PURCHASE_UNIT,
  LOTTO_LENGTH,
  MESSAGE_FOR_INVALID_WINNING_NUMBERS,
} from './constants.js';
import {
  closeModal,
  displayDetails,
  openModal,
  handleToggle,
  renderLottoIcons,
  renderTotalQuantity,
  resetLottoIcons,
  renderDrawLottoResult,
  renderProfitRatio,
} from './views.js';
import {
  addLottoToggleButtonClickEventListener,
  addPurchaseButtonClickEventListener,
  addResultButtonClickEventListener,
  addModalCloseClickEventListener,
  addReplayButtonClickEventListener,
} from './eventListeners.js';
import LottoStateModel from './models/LottoState.js';

const lottoState = new LottoStateModel();

const handlePurchaseButton = (e) => {
  e.preventDefault();
  const $purchaseAmountInput = document.querySelector('#purchaseAmount');
  const purchasedAmount = $purchaseAmountInput.value;
  if (!isValidForNoAmount(purchasedAmount)) {
    alert(MESSAGE_FOR_EMPTY_VALUE);
    return;
  }
  if (!isValidForExactAmount(purchasedAmount)) {
    alert(MESSAGE_FOR_INVALID_UNIT_VALUE);
    return;
  }
  initPurchaseLotto();
  lottoState.setPurchasedAmount(+purchasedAmount);
  lottoState.setQuantity(Number(purchasedAmount) / LOTTO_PURCHASE_UNIT);
  displayDetails(lottoState.quantity);
  renderTotalQuantity(lottoState.quantity);
  generateLottos(lottoState.quantity);
  renderLottoIcons(lottoState);
};

const generateLottos = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    const lottoNumbers = lottoState.getLottoNumbers();
    const lotto = new LottoModel();
    lotto.generate(lottoNumbers);
    lottoState.lottos.push(lotto);
  }
};

const handleModalOpen = (e) => {
  e.preventDefault();
  const winningNumbers = Array.from({ length: LOTTO_LENGTH }, (_, idx) =>
    Number(e.target[`winning-index-${idx}`].value)
  ).concat(Number(e.target['bonus-number'].value));
  if (!isValidWinningNumbers(winningNumbers)) {
    alert(MESSAGE_FOR_INVALID_WINNING_NUMBERS);
    return;
  }
  openModal();
  const places = lottoState.drawLotto(
    winningNumbers.slice(0, winningNumbers.length - 1),
    winningNumbers.slice(-1)
  );
  renderDrawLottoResult(places);
  const profitRatio = lottoState.calculateProfitRatio();
  renderProfitRatio(profitRatio);
};

const handleModalClose = () => {
  closeModal();
};

const handleToggleButton = () => {
  handleToggle(lottoState);
};

const initPurchaseLotto = () => {
  lottoState.initLottoState();
  resetLottoIcons();
};

const handleClickReplayButton = () => {
  closeModal();
  // TODO: refactor 필요
  location.reload();
  // lottoState.initLottoState();
  // displayDetails(lottoState.quantity);
  // clearPurchaseInput();
};

addPurchaseButtonClickEventListener(handlePurchaseButton);
addLottoToggleButtonClickEventListener(handleToggleButton);
addResultButtonClickEventListener(handleModalOpen);
addModalCloseClickEventListener(handleModalClose);
addReplayButtonClickEventListener(handleClickReplayButton);
displayDetails(lottoState.quantity);
