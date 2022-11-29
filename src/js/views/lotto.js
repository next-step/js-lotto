import { LOTTO } from '../utils/constants.js';
import { $ } from '../utils/dom.js';
let template;

const createNewLottoNode = () => {
  if (!template) {
    template = $('#lotto-item');
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getLottoElement = () => {
  const element = createNewLottoNode();
  $('.lotto-numbers', element).textContent = getLottoNumbers().join(', ');
  return element;
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

  newLottoList.innerHTML = '';
  const lottoImageElements = Array.from({ length: ticketCount }, () =>
    getLottoElement()
  );

  lottoImageElements.forEach((element) =>
    newLottoList.insertAdjacentElement('beforeend', element)
  );

  return newLottoList;
};
