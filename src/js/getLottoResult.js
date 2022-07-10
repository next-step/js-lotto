import { LOTTO_INFORMATION } from './constants.js';
import { $, $$ } from './DOM.js';

const generateRandomLottoNumber = () => Math.floor(Math.random() * 45) + 1;

const generateLottoTicket = (lottoCount) => {
  for (let i = 0; i < lottoCount; i++) {
    const newListItem = document.createElement('li');
    newListItem.innerText = '🎟️';
    newListItem.className = 'mx-1 text-4xl lotto-result-list-item';
    $('.lotto-result-list').appendChild(newListItem);

    const listOfLottoNumber = document.createElement('span');
    listOfLottoNumber.className = 'lotto-result-number-list ml-1';
    newListItem.appendChild(listOfLottoNumber);

    let numberList = [];
    let currentLottoCount = 0;

    while (currentLottoCount < LOTTO_INFORMATION.LOTTO_COUNT) {
      const randomNumber = generateRandomLottoNumber();
      if (!numberList.includes(randomNumber)) {
        numberList.push(randomNumber);
        currentLottoCount += 1;
      }
    }

    listOfLottoNumber.innerText = numberList.join(', ');
  }
};

const getPurchasedLottoResult = () => {
  const purchasedLottoCount =
    Number($('.price-input').value) / LOTTO_INFORMATION.LOTTO_UNIT;

  $(
    '.purchased-lotto-alert'
  ).innerText = `총 ${purchasedLottoCount}개를 구매하셨습니다.`;

  generateLottoTicket(purchasedLottoCount);
};

const displayPurchasedLottoView = () => {
  for (let i = 0; i < $$('.purchased-lotto-result-view').length; i++) {
    $$('.purchased-lotto-result-view')[i].style.display = 'block';
  }
};

const getLottoResult = () => {
  displayPurchasedLottoView();
  getPurchasedLottoResult();
};

export default getLottoResult;
