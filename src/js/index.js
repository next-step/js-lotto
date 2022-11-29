import { $ } from './utils/DOM.js';
import { handleSubmit, handleToggleBtn, handleOpenModal } from './eventHandlers.js';

const initEvents = () => {
  $('.purchasing-lotto-form').addEventListener('submit', handleSubmit);
  $('.lotto-numbers-toggle-button').addEventListener('click', handleToggleBtn);
  $('.winning-numbers-and-bonus-form').addEventListener('submit', handleOpenModal);
};

initEvents();
