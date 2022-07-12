import { lottoElement } from '../element/index.js';

const $app = document.querySelector('#app');
const $purchasedLottoList = document.querySelector('#purchased-lotto');
const $lottoCount = document.querySelector('#lotto-count');

export const onLottoNumberToggle = ({ target: { checked } }) => {
  const className = 'visible-number';
  if (checked) {
    $purchasedLottoList.classList.add(className);
  } else {
    $purchasedLottoList.classList.remove(className);
  }
};

export const appendLottoEl = (lottos) => {
  const listItems = lottos.reduce((fragment, lottoTicket) => {
    const number = lottoTicket.numbers.join(', ');
    fragment.appendChild(lottoElement(number));
    return fragment;
  }, document.createDocumentFragment());

  if ($purchasedLottoList.hasChildNodes()) {
    $purchasedLottoList.replaceChildren(listItems);
    return;
  }

  $purchasedLottoList.append(listItems);
};

export const appendLottoCountEl = (numberOfLotto) => {
  $lottoCount.textContent = numberOfLotto;
};

export const showContent = () => {
  $app.classList.add('visible-content');
};
