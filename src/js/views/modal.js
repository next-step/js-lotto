import { SELECTOR } from '../utils/constants.js';
import { $, $all } from '../utils/dom.js';

let template;

const createNewModalNode = () => {
  if (!template) {
    template = $(SELECTOR.LOTTO_MODAL);
  }
  return template.content.firstElementChild.cloneNode(true);
};

const getModalElement = (rankData) => {
  const element = createNewModalNode();

  $all(SELECTOR.LOTTO_WIN_COUNT, element).forEach(($el) => {
    const { rank } = $el.dataset;
    $el.textContent = rankData[rank];
  });

  return element;
};

export default (targetElement, { modalOn, rank }, events) => {
  const newModal = targetElement.cloneNode(true);
  newModal.innerHTML = '';

  if (modalOn) {
    newModal.insertAdjacentElement('beforeend', getModalElement(rank));
    newModal.classList.add('open');

    $(SELECTOR.MODAL_CLOSE, newModal).addEventListener('click', () => {
      events.closeModal();
    });
  }
  return newModal;
};
