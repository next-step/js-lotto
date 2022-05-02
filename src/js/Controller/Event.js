import { selector } from '../utils/consts.js';
import purchase from './Event/lottoPurchaseEvent.js';
import ticket from './Event/lottoTicketEvent.js';
import winningNumber from './Event/lottoWinningNumber.js';
import modal from './Event/lottoWinningStatistics.js';

const Event = {
  init() {
    const lottoPurchaseForm = selector('#lotto-purchase-form');
    lottoPurchaseForm.addEventListener('submit', purchase.handleSubmitEvent);
  },

  ticketToggle() {
    const ticketSwitch = selector('.switch');
    ticketSwitch.addEventListener('click', ticket.handleClickEvent);
  },

  winningNumber() {
    const winningNumberForm = selector('#lotto-winning-numbers-form');
    const winningNumberContainer = selector('#winning-number-container');
    winningNumberContainer.addEventListener(
      'keydown',
      winningNumber.handleKeyBoardEvent
    );
    winningNumberForm.addEventListener(
      'submit',
      winningNumber.handleSubmitEvent
    );
  },

  statistics() {
    const closeButton = selector('.modal-close');
    closeButton.addEventListener('click', modal.handleClosedModalEvent);

    const restartButton = selector('#restart');
    restartButton.addEventListener('click', modal.handleRestartEvent);
  },
};

export default Event;
