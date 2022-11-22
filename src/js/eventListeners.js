const addResultButtonClickEventListener = (callback) => {
  const $showResultForm = document.querySelector('#winningNumberInputs');
  $showResultForm.addEventListener('submit', callback);
};

const addModalCloseClickEventListener = (callback) => {
  const $modalClose = document.querySelector('.modal-close');
  $modalClose.addEventListener('click', callback);
};

const addPurchaseButtonClickEventListener = (callback) => {
  const $purchaseButton = document.querySelector('#purchaseButton');
  $purchaseButton.addEventListener('click', callback);
};

const addLottoToggleButtonClickEventListener = (callback) => {
  const $lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
  $lottoNumbersToggleButton.addEventListener('change', callback);
};

export {
  addLottoToggleButtonClickEventListener,
  addPurchaseButtonClickEventListener,
  addResultButtonClickEventListener,
  addModalCloseClickEventListener,
};
