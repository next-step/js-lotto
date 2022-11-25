import { $ } from './utils/DOM.js';
import { handleSubmit, handleToggleBtn } from './eventHandlers.js';

const initEvents = () => {
  $('.purchasing-lotto-form').addEventListener('submit', handleSubmit);
  $('.lotto-numbers-toggle-button').addEventListener('click', handleToggleBtn);
};

initEvents();
