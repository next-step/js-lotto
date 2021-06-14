import { $, addEvent } from '../utils/utils.js';
import { MESSAGE } from '../constants/constants.js';

export default function LottoInput(app) {
  const priceForm = $({ target: app.container, selector: '.price-form' });
  const priceInput = $({ target: priceForm, selector: '.price-input' });
  const priceButton = $({ target: priceForm, selector: '.price-button' });

  const getPrice = e => {
    e.preventDefault();
    const price = priceInput.value;
    if (price % 1000) return window.alert(MESSAGE.PRICE_HAS_REMAINDER);
    if (price < 1000) return window.alert(MESSAGE.PRICE_UNDER_MINIMUM);

    setPrice(price);
  };

  const setPrice = price => {
    const lottoCount = price / 1000;
    app.setLottoArea(lottoCount);
    app.setLottoResultArea();
    showLotto();
  };

  const showLotto = () => {
    const lottoArea = $({ target: app.container, selector: '.lotto-area' });
    const resultForm = $({
      target: app.container,
      selector: '.lotto-result-form',
    });
    lottoArea.hidden = false;
    resultForm.hidden = false;
  };

  addEvent({ el: priceForm, type: 'submit', callback: getPrice });
}
