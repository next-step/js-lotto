import { checkLottoUnit } from './checkLottoUnit.js';
import { LOTTO_UNIT } from './constants.js';
import Lotto from './Lotto.js';
import createLottoList from './createLottoList.js';

const purchaseForm = document.querySelector('#purchaseForm');
const purchaseSection = document.querySelector('#purchaseSection');
const purchaseTextLabel = document.querySelector('.my-0');
const toggleButton = document.querySelector('.lotto-numbers-toggle-button');
const lottoIcons = document.querySelector('#lotto-icons');

const lotto = new Lotto(lottoIcons);

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const alreadyExistList = purchaseSection.className.includes('is-active');
  if (alreadyExistList) return;

  const purchaseInput = document.querySelector('input[name=purchasePrice]');
  const price = purchaseInput.value;

  try {
    checkLottoUnit(price);
    const dividedLottoValue = parseInt(price, 10) / LOTTO_UNIT;

    purchaseTextLabel.innerText = `총 ${dividedLottoValue}개를 구매하였습니다.`;
    purchaseSection.classList.add('is-active');

    lotto.renderCreatedLottoList(createLottoList(dividedLottoValue));
  } catch (error) {
    purchaseInput.value = '';
    alert(error.message);
  }
});

toggleButton.addEventListener('click', (e) => {
  const { checked } = e.target;
  const lottoWrapper = document.querySelectorAll('.lotto-wrapper');
  if (checked) {
    lotto.showLottoList(lottoWrapper);
  } else {
    lotto.hiddenLottoList(lottoWrapper);
  }
});
