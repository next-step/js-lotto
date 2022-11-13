import {
  $confirmButton,
  $lottoNumbersToggleButton,
  $modal,
  $modalClose,
  $purchasingAmountInput,
  $resultAreas,
  $showResultButton,
} from './util/Element.js';
import { buy } from './util/LottoBuyer.js';
import { setLottoNumberToggle, setTickets } from './util/Ticket.js';

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

const onTicketsBought = () => {
  try {
    const purchasingAmount = $purchasingAmountInput.value;
    const tickets = buy(parseInt(purchasingAmount));
    setTickets(tickets);
    $resultAreas.forEach(($el) => $el.classList.remove('hidden'));
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
};

export function initialize() {
  $resultAreas.forEach(($el) => $el.classList.add('hidden'));
  $confirmButton.addEventListener('click', onTicketsBought);
  $lottoNumbersToggleButton.addEventListener('click', setLottoNumberToggle);

  $showResultButton.addEventListener('click', onModalShow);
  $modalClose.addEventListener('click', onModalClose);
}
