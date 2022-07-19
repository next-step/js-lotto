import { lottoElement } from '../element/index.js';

const $app = document.querySelector('#app');
const $purchasedLottoList = document.querySelector('#purchased-lotto');
const $lottoCount = document.querySelector('#lotto-count');

const lottoNumberToggleClassName = 'visible-number';
export const onLottoNumberToggle = ({ target: { checked } }) => {
  if (checked) {
    $purchasedLottoList.classList.add(lottoNumberToggleClassName);
  } else {
    $purchasedLottoList.classList.remove(lottoNumberToggleClassName);
  }
};

export const offLottoNumberToggle = () => {
  $purchasedLottoList.classList.remove(lottoNumberToggleClassName);
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

const contentToggleClassName = 'visible-content';
export const showContent = () => {
  $app.classList.add(contentToggleClassName);
};

export const hideContent = () => {
  $app.classList.remove(contentToggleClassName);
};
