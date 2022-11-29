import { $ } from './utils/DOM.js';

import { renderModal } from './view/modal.js';

export const openModal = (winningNumbersAndBonus) => {
  $('.modal').classList.add('open');
  renderModal(winningNumbersAndBonus);
};

export const closeModal = () => {
  $('.modal').classList.remove('open');
};
