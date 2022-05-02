import { selector, selectorAll } from '../utils/consts.js';
import {
  amountInfoComponent,
  lottoTicketComponent,
} from './Component/lottoTicket.js';
import LottoPurchaseView from './lottoPurchaseView.js';

const LottoTicketView = (function () {
  const ticketList = selector('#lotto-ticket-list');
  let randomNumberGroup;

  return {
    /**
     * @param { Array[][] } randomNumber
     */
    set setRandomNumber(randomNumber) {
      randomNumberGroup = randomNumber;
    },

    showLottoInfoUI(amount) {
      selector('#counted-ticket').textContent = amountInfoComponent(amount);
      ticketList.innerHTML = lottoTicketComponent(amount);
      selector('#purchased-lottos').style.display = 'block';
      selector('#lotto-winning-numbers-form').style.display = 'block';
    },

    hideLottoInfoUI() {
      selector('#purchased-lottos').style.display = 'none';
      selector('#lotto-winning-numbers-form').style.display = 'none';
      this.initRandomNumber();
    },

    initRandomNumber() {
      randomNumberGroup = undefined;
    },

    showTicketUI() {
      ticketList.classList.add('flex-col');
      selectorAll('#ticket-number').forEach((li, index) => {
        li.style.display = 'inline';
        li.textContent = String(randomNumberGroup[index]).replaceAll(',', ', ');
      });
    },

    hideTicketUI() {
      ticketList.classList.remove('flex-col');
      selector('.lotto-numbers-toggle-button').checked;
      selectorAll('#ticket-number').forEach((li) => {
        li.style.display = 'none';
      });
    },
  };
})();

export default LottoTicketView;
