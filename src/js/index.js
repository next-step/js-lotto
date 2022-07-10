import { LOTTO_UNIT, ALERT_MESSAGES } from './constants.js';
import Lotto from './Lotto.js';
import createLottoList from './createLottoList.js';

const purchaseForm = document.querySelector('#purchaseForm');
const purchaseSection = document.querySelector('#purchaseSection');
const purchaseTextLabel = document.querySelector('.my-0');
const showToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const lottoIcons = document.querySelector('#lotto-icons');

const lotto = new Lotto(lottoIcons);

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const alreadyExistList = purchaseSection.className.includes('is-active');
  if (alreadyExistList) return;

  const purchaseInput = document.querySelector('input[name=purchasePrice]');

  try {
    const price = parseInt(purchaseInput.value, 10);
    const dividedLotto = price / LOTTO_UNIT;

    if (price % LOTTO_UNIT !== 0) {
      throw new Error(ALERT_MESSAGES.LOTTO_UNIT_ERROR);
    }

    purchaseTextLabel.innerText = `총 ${dividedLotto}개를 구매하였습니다.`;
    purchaseSection.classList.add('is-active');

    const lottoNumberArrayList = createLottoList(dividedLotto);
    lotto.renderCreatedLottoList(lottoNumberArrayList);
  } catch (error) {
    purchaseInput.value = '';
    alert(error.message);
  }
});

showToggleButton.addEventListener('click', (e) => {
  const { checked } = e.target;
  const lottoWrapper = document.querySelectorAll('.lotto-wrapper');
  if (checked) {
    lotto.showLottoList(lottoWrapper);
  } else {
    lotto.hiddenLottoList(lottoWrapper);
  }
});
