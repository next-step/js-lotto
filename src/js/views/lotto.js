import { LOTTO } from '../utils/constants.js';

const getLottoElement = (lottoNumbers) => {
  return `<li class='lotto-wrapper mx-1 text-4xl'><span class='lotto-image'>🎟️</span><span class='lotto-numbers d-none' data-component=lottoNumbers'>${lottoNumbers.join(
    ', '
  )}</span></li>`;
};

const getLottoNumbers = () => {
  const lottoNumbers = [];
  while (lottoNumbers.length !== LOTTO.LENGTH) {
    const randomNumber = Math.floor(
      Math.random() * (LOTTO.MAX_VALUE - LOTTO.MIN_VALUE) + LOTTO.MIN_VALUE
    );
    if (!lottoNumbers.includes(randomNumber)) {
      lottoNumbers.push(randomNumber);
    }
  }
  return lottoNumbers;
};

export default (targetElement, { ticketCount }) => {
  const newLottoList = targetElement.cloneNode(true);

  while (newLottoList.firstChild) {
    newLottoList.removeChild(newLottoList.firstChild);
  }

  const lottoImageHTML = Array.from({ length: ticketCount }, () =>
    getLottoElement(getLottoNumbers())
  ).join('');

  newLottoList.insertAdjacentHTML('beforeend', lottoImageHTML);
  return newLottoList;
};
