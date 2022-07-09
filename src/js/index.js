import { checkLottoUnit } from './checkLottoUnit.js';
import { LOTTO_UNIT } from './constants.js';
import Lotto from './Lotto.js';
import createLottoList from './createLottoList.js';

const purchaseForm = document.querySelector('#purchaseForm');
const purchaseSection = document.querySelector('#purchaseSection');
const purchaseTextLabel = document.querySelector('.my-0');
const toggleButton = document.querySelector('.lotto-numbers-toggle-button');
const lottoIcons = document.querySelector('#lotto-icons');

purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const purchaseInput = document.querySelector('input[name=purchasePrice]');
  const price = purchaseInput.value;

  try {
    checkLottoUnit(price);
    const dividedLottoValue = parseInt(price, 10) / LOTTO_UNIT;

    purchaseTextLabel.innerText = `총 ${dividedLottoValue}개를 구매하였습니다.`;
    purchaseSection.classList.add('is-active');
  } catch (error) {
    purchaseInput.value = '';
    alert(error.message);
  }
});

$showResultButton.addEventListener('click', onModalShow)
$modalClose.addEventListener('click', onModalClose)
