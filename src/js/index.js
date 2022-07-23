import { DrawForm, Toggle } from './components/index.js';

import getLottoList from './lotto/index.js';
import { getLottoAvailableQuantity } from './lotto/validation/index.js';

const lottoList = document.querySelector('.lotto-list');
const listTitleElement = lottoList.querySelector('.lotto-title');
const showListElement = lottoList.querySelector('.lotto-number-show');
const hideListElement = lottoList.querySelector('.lotto-number-hide');

const lottoNumberToggleButton = document.querySelector('.lotto-numbers-toggle-button');

const lottoSheetForm = document.querySelector('.lotto-sheet-form');
const lottoPriceInput = document.querySelector('.lotto-price-input');

const target = { title: listTitleElement, show: showListElement, hide: hideListElement };

DrawForm({
  target,
  input: lottoPriceInput,
  form: lottoSheetForm,
  validation: getLottoAvailableQuantity,
  logic: getLottoList,
});

Toggle({ target, checkbox: lottoNumberToggleButton });
