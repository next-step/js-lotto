import { $ } from './utils/DOM.js';
import {
  handlePurchaseLotto,
  handleToggleBtn,
  handleOpenModal,
  handleRestart,
  handleCloseModal,
} from './eventHandlers.js';

const initEvents = () => {
  $('.purchasing-lotto-form').addEventListener('submit', handlePurchaseLotto);
  $('.lotto-numbers-toggle-btn').addEventListener('click', handleToggleBtn);
  $('.winning-numbers-and-bonus-form').addEventListener('submit', handleOpenModal);
  $('.restart-btn').addEventListener('click', handleRestart);
  $('.modal-close').addEventListener('click', handleCloseModal);
};

initEvents();
