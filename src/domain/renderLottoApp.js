import { LottoOrganizer, LottoCustomer, LottoSeller } from './models/index.js';
import {
  LottoAmountForm,
  LottoTicketList,
  LottoContentRenderer,
  LottoWinningNumberForm,
  ResultModal
} from './services/web/index.js';
import { AMOUNT_PLACEHOLDER, HEADING_TITLE } from './constants/index.js';
import { InputBuilder } from '../view/components/index.js';
import { getQuerySelector } from '../view/DOMHandler.js';

const renderApp = () => {
  try {
    const $lottoContent = getQuerySelector('#lotto-content');
    const amountInputBuilder = new InputBuilder('number', 'lotto-amount', 'lotto-amount', AMOUNT_PLACEHOLDER);
    const numberInputBuilder = new InputBuilder('number');
    const inputToggleCheckboxBuilder = new InputBuilder(
      'checkbox',
      'toggle-lotto-tickets',
      'toggle-lotto-tickets',
      AMOUNT_PLACEHOLDER
    );
    const lottoTicketList = new LottoTicketList(
      inputToggleCheckboxBuilder,
      LottoOrganizer.lottoPrice(),
      LottoCustomer,
      LottoSeller
    );
    const resultModal = new ResultModal();
    const lottoWinningNumberForm = new LottoWinningNumberForm(InputBuilder, (winningNumber) =>
      resultModal.getLottoWinningBonusNumber(winningNumber)
    );

    const lottoAmountForm = new LottoAmountForm(amountInputBuilder, LottoOrganizer.lottoPrice(), [
      (amount) => lottoTicketList.handleAmount(amount),
      () => lottoWinningNumberForm.show()
    ]);

    const lottoContentRenderer = new LottoContentRenderer(
      HEADING_TITLE,
      lottoAmountForm,
      lottoTicketList,
      lottoWinningNumberForm,
      $lottoContent
    );

    // lottoAmountForm.render();
    lottoContentRenderer.render();
  } catch (error) {
    console.error(error);
  }
};

export default renderApp;
