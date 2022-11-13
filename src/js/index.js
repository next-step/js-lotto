import { isValidForNoAmount, isValidForExactAmount } from './validators.js';
import LottoModel from './lotto.js';
import { generateLottoNumbers } from './generateLottos.js';

const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const $purchaseAmountInput = document.querySelector('#purchaseAmount');
const $purchaseButton = document.querySelector('#purchaseButton');
const $purchasedLottoList = document.querySelector('#purchasedLottoList');
const $winningNumberInputs = document.querySelector('#winningNumberInputs');
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
    alert('반드시 값을 입력해주세요!');
    return;
  }
  if (!isValidForExactAmount(purchasedAmount)) {
    alert('로또 한 장의 단위는 1000원 입니다.');
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
    const generatedNumbers = generateLottoNumbers();

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

$showResultButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
$purchaseButton.addEventListener('click', onPurchaseClick);
$lottoNumbersToggleButton.addEventListener('change', onToggleChange);
displayDetails();
