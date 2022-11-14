import { isValidForNoAmount, isValidForExactAmount, isAlreadyExist } from './validators.js';
import LottoModel from './lotto.js';
import { generateLottoNumbers } from './generateLottos.js';
import { MESSAGE_FOR_EMPTY_VALUE, MESSAGE_FOR_INVALID_UNIT_VALUE } from './constants.js';
import { closeModal, displayDetails, openModal } from './views.js';
import {
  addLottoToggleButtonClickEventListener,
  addPurchaseButtonClickEventListener,
  addResultButtonClickEventListener,
  addModalCloseClickEventListener,
} from './eventListeners.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $purchaseAmountInput = document.querySelector('#purchaseAmount');
const $totalQuantity = document.querySelector('#totalQuantity');
const $lottoIconList = document.querySelector('#lottoIconList');

const lottoState = {
  purchasedAmount: 0,
  quantity: 0,
  lottos: [],
  isOpen: false,
};

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onToggleChange = () => {
  const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
  if (!lottoState.isOpen) {
    $lottoIconList.style.flexDirection = 'column';
    $lottoNumbers.forEach((el) => {
      el.style.display = 'inline';
    });
    lottoState.isOpen = true;
    return;
  }
  $lottoIconList.style.flexDirection = 'row';
  $lottoNumbers.forEach((el) => {
    el.style.display = 'none';
  });
  lottoState.isOpen = false;
};

const onPurchaseClick = (e) => {
  e.preventDefault();
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
  lottoState.purchasedAmount = purchasedAmount;
  lottoState.quantity = Number(purchasedAmount) / 1000;
  displayDetails();
  $totalQuantity.innerText = lottoState.quantity;
  generateLottos(lottoState.quantity);
  renderLottoIcons();
};

const generateLottos = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    let hasNoSameLotto = true;
    let generatedNumbers;
    const lottoNumbers = lottoState.lottos.map((lotto) => lotto.winningNumbers);
    generatedNumbers = generateLottoNumbers();

    while (hasNoSameLotto) {
      if (!isAlreadyExist(lottoNumbers.concat([generatedNumbers]))) {
        hasNoSameLotto = false;
      } else {
        generatedNumbers = generateLottoNumbers();
      }
    }

    const lotto = new LottoModel(generatedNumbers);
    lottoState.lottos.push(lotto);
  }
};

const displayDetails = () => {
  if (!lottoState.quantity) {
    $purchasedLottoList.style.display = 'none';
    $winningNumberInputs.style.display = 'none';
    return;
  }
  $purchasedLottoList.style.display = 'block';
  $winningNumberInputs.style.display = 'block';
};

const renderLottoIcons = () => {
  if (!lottoState.quantity || !lottoState.lottos.length) return;
  lottoState.lottos.forEach((lotto) => {
    const $li = document.createElement('li');
    $li.className = 'mx-1 text-4xl';
    $li.style.display = 'flex';

    const $icon = document.createElement('div');
    $icon.className = 'lotto-item';
    $icon.innerText = `🎟️`;
    $li.appendChild($icon);

    const $lottoNumbers = document.createElement('div');
    $lottoNumbers.className = 'lotto-numbers';
    $lottoNumbers.style.display = 'none';
    $lottoNumbers.innerText = `${lotto.winningNumbers.join(', ')}`;
    $li.appendChild($lottoNumbers);
    $lottoIconList.appendChild($li);
  });
};

const resetDatas = () => {
  lottoState.purchasedAmount = 0;
  lottoState.quantity = 0;
  lottoState.lottos = [];
};

const resetLottoIcons = () => {
  $lottoIconList.innerHTML = '';
};

const initPurchaseLotto = () => {
  resetDatas();
  resetLottoIcons();
};

displayDetails();
addPurchaseButtonClickEventListener(onPurchaseClick);
addLottoToggleButtonClickEventListener(onToggleChange);
addResultButtonClickEventListener(onModalShow);
addModalCloseClickEventListener(onModalClose);
