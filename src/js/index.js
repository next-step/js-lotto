import { $ } from './utils/DOM.js';
import {
  handleSubmit,
  handleToggleBtn,
  handleOpenModal,
  handleRestart,
  handleCloseModal,
} from './eventHandlers.js';

const initEvents = () => {
  $('.purchasing-lotto-form').addEventListener('submit', handleSubmit);
  $('.lotto-numbers-toggle-button').addEventListener('click', handleToggleBtn);
  $('.winning-numbers-and-bonus-form').addEventListener('submit', handleOpenModal);
  $('.restart-btn').addEventListener('click', handleRestart);
  $('.modal-close').addEventListener('click', handleCloseModal);
};

initEvents();
