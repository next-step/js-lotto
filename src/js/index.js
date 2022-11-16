import $ from './util.js';
import Lotto from './lotto.js';

const lotto = new Lotto({
  $purchaseForm: $('[data-cy="lotto-purchase-form"]'),
  $purchaseInput: $('[data-cy="lotto-purchase-input"]'),
  $lottoCount: $('[data-cy="purchased-lotto-count"]'),
  $myLotto: $('[data-cy="purchased-lotto"]'),
});

lotto.initEvents();
