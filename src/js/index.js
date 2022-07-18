import createLottoNumber from './createLottoNumber.js';
import getLottoPurchaseNumbers from './getLottoPurchaseNumbers.js';

const purchaseInput = document.querySelector('.input-purchase');
const purchaseButton = document.querySelector('.btn-purchase');
const lotto = document.querySelector('#lotto-list');
const toggleButton = document.querySelector('.lotto-numbers-toggle-button');
const purchaseList = document.querySelector('section.mt-9');
const winningNumber = document.querySelector('form.mt-9');

function createLottoListTitle(count) {
  const purchaseLottoTitle = document.querySelector('.lotto-title');
  const newLabel = `총 ${count}개를 구매하였습니다.`;

  purchaseLottoTitle.innerText = newLabel;
}

function createLottoList(count) {
  const lotto = document.querySelector('#lotto-list');
  let template = '';

  lotto.innerHTML = '';

  for (let i = 0; i < count; i++) {
    template += `
    <li class="lotto-item">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-detail">${createLottoNumber()}</span>
    </li>
    `;
  }

  lotto.innerHTML = template;
}

function showLottoDetail(isChecked) {
  const lottoDetail = document.querySelectorAll('.lotto-detail');

  if (isChecked) {
    lotto.classList.add('flex-col');
    lottoDetail.forEach((lotto) => (lotto.style.display = 'inline'));
  } else {
    lotto.classList.remove('flex-col');
    lottoDetail.forEach((lotto) => (lotto.style.display = 'none'));
  }
}

function handlePurchaseLotto() {
  const purchaseValue = purchaseInput.value;

  if (!purchaseValue) {
    alert('구입금액을 입력해주세요.');
    purchaseInput.focus();
    return;
  }

  if (Number(purchaseValue) < 1000) {
    alert('값은 1000이상이어야 합니다.');
    purchaseInput.value = '';
    return;
  }

  const purchaseCount = getLottoPurchaseNumbers(purchaseValue);
  createLottoListTitle(purchaseCount);
  createLottoList(purchaseCount)

  purchaseList.style.display = 'block';
  winningNumber.style.display = 'block';
}

function init() {
  purchaseList.style.display = 'none';
  winningNumber.style.display = 'none';
  purchaseInput.focus();
}

purchaseButton.addEventListener('click', (e) => {
  e.preventDefault();
  handlePurchaseLotto();
});
toggleButton.addEventListener('click', (e) => {
  const { checked } = e.target;
  showLottoDetail(checked);
});
window.addEventListener('load', () => {
  init();
});
