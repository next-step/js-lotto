import { LOTTO_INFORMATION } from './constants.js';
import { $, $$ } from './DOM.js';

const getPurchasedLottoTicketCount = () =>
  Number($('.price-input').value) / LOTTO_INFORMATION.PRICE_UNIT;

const getRandomLottoNumber = () =>
  Math.floor(Math.random() * LOTTO_INFORMATION.MAXIMUM_NUMBER) + 1;

const getRandomLottoNumberListPerTicket = () => {
  const numberList = [];

  while (numberList.length < LOTTO_INFORMATION.COUNT) {
    const randomNumber = getRandomLottoNumber();
    if (!numberList.includes(randomNumber)) {
      numberList.push(randomNumber);
    }
  }

  return numberList;
};

const renderLottoResult = () => {
  $(
    '.purchased-lotto-alert'
  ).innerText = `총 ${getPurchasedLottoTicketCount()}개를 구매하셨습니다.`;

  const lottoRenderList = Array.from(
    { length: getPurchasedLottoTicketCount() },
    () =>
      `<li class="mx-1 text-4xl lotto-result-list-item">🎟️<span class="lotto-result-number-list ml-1">${getRandomLottoNumberListPerTicket().join(
        ', '
      )}</span></li>`
  );
  $('.lotto-result-list').innerHTML = lottoRenderList.join('');
};

const displayLottoView = () => {
  const purchasedLottoResultViewList = $$('.purchased-lotto-result-view');
  purchasedLottoResultViewList.forEach(
    (element) => (element.style.display = 'block')
  );
  renderLottoResult();
};

export default displayLottoView;
