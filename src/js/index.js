import { $ } from './utils/DOM.js';
import { handleSubmit, handleToggleBtn, handleOpenLottoResult } from './eventHandlers.js';

const initEvents = () => {
  $('.purchasing-lotto-form').addEventListener('submit', handleSubmit);
  $('.lotto-numbers-toggle-button').addEventListener('click', handleToggleBtn);
  $('.winning-numbers-and-bonus-form').addEventListener('submit', handleOpenLottoResult);
};

initEvents();
