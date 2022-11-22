import { $ } from './utils/DOM.js';
import { handleSubmit, handleToggleBtn } from './eventHandlers.js';

const initEvents = () => {
  $('[data-cy="lotto-purchase-form"]').addEventListener('submit', handleSubmit);
  $('.lotto-numbers-toggle-button').addEventListener('click', handleToggleBtn);
};

initEvents();
