import { $ } from './utils/DOM.js';

import { renderModal } from './viewWinningResult.js';

export const openModal = (winningNumbersAndBonus) => {
  $('.modal').classList.add('open');
  renderModal(winningNumbersAndBonus);
};
