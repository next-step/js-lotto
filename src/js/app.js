import { ERROR_INPUT_PRICE_UNIT } from './constants/message.js';

import { createLottos } from './utils/random.js';
import { $ } from './utils/selector.js';
const $lottoToggle = $('#lotto-numbers-toggle');

export const purchaseLotto = (e) => {
  e.preventDefault();
  const inputPrice = $('#input-price').value;

  if (!isThousandUnits(inputPrice)) {
    alert(ERROR_INPUT_PRICE_UNIT);
    return;
  }

  const count = Number(inputPrice) / 1000;

  insertSectionMessage(count);
  showResultContainer();
  const lottos = createLottos(count);

  lottos.forEach((lotto) => {
    insertLottoElement(lotto);
  });
};

const showResultContainer = () => {
  $('.result-container').style.display = 'block';
};

const isThousandUnits = (price) => Number(price) % 1000 === 0;

const insertSectionMessage = (count) => {
  $('.section_message').innerText = `총 ${count}개를 구매하였습니다`;
};

const insertLottoElement = (lotto) => {
  const ul = $('#lotto-container');
  const li = createLiElement(lotto);

  ul.appendChild(li);
};

const createLiElement = (lotto) => {
  const li = document.createElement('li');
  li.className = 'lotto-content';

  const spanIcon = document.createElement('span');
  spanIcon.className = 'mx-3 text-4xl';
  spanIcon.innerText = '🎟️';

  const spanLottoNumbers = document.createElement('span');
  spanLottoNumbers.className = 'text-xl lotto-numbers';
  spanLottoNumbers.innerText = lotto.join(', ');

  li.insertAdjacentElement('afterbegin', spanIcon);
  li.insertAdjacentElement('beforeend', spanLottoNumbers);

  return li;
};

const hideLottoNumbers = () => {
  document.querySelectorAll('.lotto-numbers').forEach((elem) => {
    elem.style.display = 'none';
  });
  $('#lotto-container').style.flexDirection = 'row';
};

const showLottoNumbers = () => {
  document.querySelectorAll('.lotto-numbers').forEach((elem) => {
    elem.style.display = 'block';
  });
  $('#lotto-container').style.flexDirection = 'column';
};

const controlLottoNumbers = () => {
  if (!$lottoToggle.checked) {
    hideLottoNumbers();
    return;
  }
  showLottoNumbers();
};

$lottoToggle.addEventListener('click', controlLottoNumbers);
