import { isValidForNoAmount, isValidForExactAmount } from './validators.js';
import LottoModel from './models/LottoTicket.js';
import {
  MESSAGE_FOR_EMPTY_VALUE,
  MESSAGE_FOR_INVALID_UNIT_VALUE,
  LOTTO_PURCHASE_UNIT,
} from './constants.js';
import {
  closeModal,
  displayDetails,
  openModal,
  handleToggle,
  renderLottoIcons,
  renderTotalQuantity,
  resetLottoIcons,
} from './views.js';
import {
  addLottoToggleButtonClickEventListener,
  addPurchaseButtonClickEventListener,
  addResultButtonClickEventListener,
  addModalCloseClickEventListener,
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

const handleModalOpen = () => {
  openModal();
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

addPurchaseButtonClickEventListener(handlePurchaseButton);
addLottoToggleButtonClickEventListener(handleToggleButton);
addResultButtonClickEventListener(handleModalOpen);
addModalCloseClickEventListener(handleModalClose);
displayDetails(lottoState.quantity);
