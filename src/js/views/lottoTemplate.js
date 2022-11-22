import { SELECTOR } from '../utils/constants.js';
import { $ } from '../utils/dom.js';

export default (targetElement) => {
  const newLottoTemplate = targetElement.cloneNode(true);
  $(SELECTOR.PURCHASED_LOTTO, newLottoTemplate).classList.remove('d-none');
  $(SELECTOR.INPUT_LOTTO_NUMS, newLottoTemplate).classList.remove('d-none');
  return newLottoTemplate;
};
