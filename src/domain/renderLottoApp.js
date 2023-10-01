import { LottoOrganizer, LottoCustomer, LottoSeller, LottoMachine, LottoCalculator } from './models/index.js';
import {
  LottoAmountForm,
  LottoTicketList,
  LottoContentRenderer,
  LottoWinningNumberForm,
  ResultModal
} from './services/web/index.js';
import { AMOUNT_PLACEHOLDER, HEADING_TITLE } from './constants/index.js';
import { InputBuilder, TableBuilder } from '../view/components/index.js';
import { getQuerySelector } from '../view/DOMHandler.js';

const createInputBuilder = (type, id, name, placeholder) => new InputBuilder(type, id, name, placeholder);

const initRender = ($content, title, forms, ticketList, resultModal, winningForm) => {
  const renderer = new LottoContentRenderer(title, forms, ticketList, winningForm, resultModal, $content);
  renderer.render();
};

const renderApp = () => {
  try {
    const $lottoContent = getQuerySelector('#lotto-content');

    const resultTableBuilder = new TableBuilder();
    const amountInput = createInputBuilder('number', 'lotto-amount', 'lotto-amount', AMOUNT_PLACEHOLDER);
    const toggleInput = createInputBuilder(
      'checkbox',
      'toggle-lotto-tickets',
      'toggle-lotto-tickets',
      AMOUNT_PLACEHOLDER
    );
    const ticketList = new LottoTicketList(toggleInput, LottoOrganizer.lottoPrice(), LottoCustomer, LottoSeller);
    const resultModal = new ResultModal(resultTableBuilder, LottoMachine, LottoCalculator, LottoOrganizer, renderApp);

    const winningNumberCallback = (winningNumber) =>
      resultModal.getLottoWinningBonusNumber(winningNumber, ticketList.lottoTickets);
    const lottoWinningForm = new LottoWinningNumberForm(InputBuilder, winningNumberCallback);

    const amountCallbacks = [(amount) => ticketList.handleAmount(amount), () => lottoWinningForm.show()];
    const lottoAmountForm = new LottoAmountForm(amountInput, LottoOrganizer.lottoPrice(), amountCallbacks);

    initRender($lottoContent, HEADING_TITLE, lottoAmountForm, ticketList, resultModal, lottoWinningForm);
  } catch (error) {
    console.error(error);
  }
};

export default renderApp;
