import { $ } from '../utils/selector.js';

export const isPurchasedLotto = () => {
  const lottoContainer = $('#lotto-container');
  return lottoContainer.hasChildNodes();
};

export const removePurchasedLotto = () => {
  const ul = $('#lotto-container');
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
};
export const resetDisplay = () => {
  const $lottoToggle = $('#lotto-numbers-toggle');
  const lottoContainer = $('#lotto-container');

  $lottoToggle.checked = false;
  lottoContainer.classList.remove('d-block');
  lottoContainer.classList.add('lotto-list');
};

export const showResultContainer = () => {
  $('.result-container').style.display = 'block';
};

export const insertPurchaseCompletedMessage = (count) => {
  $('.section_message').innerText = `총 ${count}개를 구매하였습니다`;
};

export const toggleLottoNumbers = () => {
  const lottoContainer = $('#lotto-container');
  lottoContainer.classList.toggle('d-block');
  lottoContainer.classList.toggle('lotto-list');
};

export const insertLottoElement = (lotto) => {
  const ul = $('#lotto-container');
  console.log(lotto);
  const li = createLottoElement(lotto);

  ul.appendChild(li);
};

export const createLottoElement = (lotto) => {
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
