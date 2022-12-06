import { SELECTOR } from '../utils/constants.js';
import { $, $all } from '../utils/dom.js';
import { calculateProfitRate } from '../utils/service.js';

let template;

const createNewModalNode = () => {
  if (!template) {
    template = $(SELECTOR.LOTTO_MODAL);
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getModalElement = (state) => {
  const { rank: rankData, purchaseAmount } = state;
  const element = createNewModalNode();

  $all(SELECTOR.LOTTO_WIN_COUNT, element).forEach(($el) => {
    const { rank } = $el.dataset;
    $el.textContent = rankData[rank];
  });

  $(SELECTOR.PROFIT_RATE, element).textContent = calculateProfitRate(
    rankData,
    purchaseAmount
  );

  return element;
};

export default (targetElement, state, events) => {
  const newModal = targetElement.cloneNode(true);
  const { modalOn } = state;
  newModal.innerHTML = '';

  if (modalOn) {
    newModal.insertAdjacentElement('beforeend', getModalElement(state));
    newModal.classList.add('open');

    $(SELECTOR.MODAL_CLOSE, newModal).addEventListener('click', () => {
      events.closeModal();
    });

    $(SELECTOR.RESET_BUTTON, newModal).addEventListener('click', () => {
      events.clear();
    });
  }
  return newModal;
};
