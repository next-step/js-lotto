import { LOTTO_UNIT_PRICE } from './constants/index.js';
import { Lotto } from './models/index.js';
import { $, validate } from './utils/index.js';
import {
  LottoView,
  LottoWinningNumberFormView,
  LottoRankModalView,
} from './views/index.js';

const lotto = new Lotto();
const lottoView = new LottoView($('#orders'));
const lottoWinningNumberFormView = new LottoWinningNumberFormView(
  $('#winning-number-form')
);
const lottoRankModalView = new LottoRankModalView($('.modal'));

$('#checkout').addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    const { value } = e.target.elements.won;

    validate.isMultipleOfLottoPrice(value);

    lotto.createLottos(value / LOTTO_UNIT_PRICE);
    lottoView.renderList(lotto);
    lottoView.renderMessage(lotto);
    lottoView.show();
    lottoWinningNumberFormView.show();
  } catch (error) {
    alert(error.message);
  }
});

lottoWinningNumberFormView.addSubmitEventListener((e) => {
  e.preventDefault();

  try {
    const winningNumbers = Array.from(e.target.elements)
      .filter((element) => element.classList.contains('winning-number'))
      .map((element) => element.value);
    const bonusNumber = Array.from(e.target.elements)
      .filter((element) => element.classList.contains('bonus-number'))
      .map((element) => element.value);

    validate.isDuplicateNumbers(winningNumbers.concat(bonusNumber));

    lotto.setWinningLotto(winningNumbers, bonusNumber);
    lottoRankModalView.renderResult(lotto);
    lottoRankModalView.open();
  } catch (error) {
    alert(error.message);
  }
});

lottoRankModalView.addResetEventListener(() => {
  lottoView.hide().resetSwitch();
  lottoWinningNumberFormView.hide().resetForm();
  lotto.init();
  $('#checkout').reset();
});
