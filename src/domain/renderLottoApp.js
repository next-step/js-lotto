import { LottoOrganizer } from './models/index.js';
import { AMOUNT_PLACEHOLDER, HEADING_TITLE } from './constants/index.js';
import { InputBuilder } from '../view/components/index.js';
import { LottoAmountForm, LottoContentRenderer } from './services/web/index.js';
import { getQuerySelector } from '../view/DOMHandler.js';

const handleAmount = (amount) => {
  console.log(amount);
};

const renderApp = () => {
  try {
    const $lottoContent = getQuerySelector('#lotto-content');
    const inputBuilder = new InputBuilder('lotto-amount', 'lotto-amount', AMOUNT_PLACEHOLDER, 'number');
    const lottoAmountForm = new LottoAmountForm(inputBuilder, LottoOrganizer.lottoPrice(), handleAmount);
    const lottoContentRenderer = new LottoContentRenderer(HEADING_TITLE, lottoAmountForm, null, $lottoContent);

    // lottoAmountForm.render();
    lottoContentRenderer.render();
  } catch (error) {
    console.error(error);
  }
};

export default renderApp;
