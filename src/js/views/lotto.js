import { $ } from '../utils/dom.js';
import { SELECTOR } from '../utils/constants.js';
let template;

const createNewLottoNode = () => {
  if (!template) {
    template = $(SELECTOR.LOTTO_ITEM);
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getLottoElement = (lottoNumbers) => {
  const element = createNewLottoNode();
  $(SELECTOR.LOTTO_NUMS, element).textContent = lottoNumbers.join(', ');
  return element;
};

export default (targetElement, { lottos }) => {
  const newLottoList = targetElement.cloneNode(true);
  newLottoList.innerHTML = '';

  const lottoImageElements = lottos.map((lotto) => {
    return getLottoElement(lotto.getLottoNumbers());
  });

  lottoImageElements.forEach((element) =>
    newLottoList.insertAdjacentElement('beforeend', element)
  );

  return newLottoList;
};
