import { LOTTO_UNIT, ALERT_MESSAGES } from './constants.js';
import Lotto from './Lotto.js';
import createLottoList from './createLottoList.js';
import toggleLottoNumbers from './toggleLottoNumbers.js';

const purchaseForm = document.querySelector('#purchase-form');
const purchaseSection = document.querySelector('#purchase-section');
const purchaseTextLabel = document.querySelector('.my-0');
const showToggleButton = document.querySelector('.lotto-numbers-toggle-button');
const lottoIcons = document.querySelector('#lotto-icons');

const lotto = new Lotto(lottoIcons);

const renderPurchasedCount = (dividedLotto) => {
  purchaseTextLabel.innerText = `총 ${dividedLotto}개를 구매하였습니다.`;
  purchaseSection.classList.add('is-active');
};

const renderLottoList = (e) => {
  e.preventDefault();

  const purchaseInput = document.querySelector('input[name=purchasePrice]');

  const isAlreadyExistList = purchaseSection.className.includes('is-active');
  if (isAlreadyExistList) return;

  try {
    const price = parseInt(purchaseInput.value, 10);
    const dividedLotto = price / LOTTO_UNIT;

    if (price % LOTTO_UNIT !== 0) {
      throw new Error(ALERT_MESSAGES.LOTTO_UNIT_ERROR);
    }

    renderPurchasedCount(dividedLotto);

    const lottoNumberArrayList = createLottoList(dividedLotto);

    lotto.renderCreatedLottoList(lottoNumberArrayList);
  } catch (error) {
    purchaseInput.value = '';
    alert(error.message);
  }
};

purchaseForm.addEventListener('submit', renderLottoList);
showToggleButton.addEventListener('click', (e) => toggleLottoNumbers(e, lotto));
