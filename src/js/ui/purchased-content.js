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
  while ($purchasedLottoList.hasChildNodes()) {
    $purchasedLottoList.removeChild($purchasedLottoList.firstChild);
  }

  lottos.forEach((item) => {
    const number = item.numbers.join(', ');
    $purchasedLottoList.append(lottoElement(number));
  });
};

export const appendLottoCountEl = (numberOfLotto) => {
  $lottoCount.textContent = numberOfLotto;
};

export const showContent = () => {
  $app.classList.add('visible-content');
};
