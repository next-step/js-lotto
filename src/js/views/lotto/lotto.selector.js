const selectors = {
  formBuy: document.querySelector('#form-buy'),
  formCheck: document.querySelector('#form-check'),
  inputPurchaseAmount: document.querySelector('#input-purchase-amount'),
  labelBuyCnt: document.querySelector('#label-buy-cnt'),
  listLotto: document.querySelector('#list-lotto'),
  toggle: document.querySelector('.lotto-numbers-toggle-button'),
  btnShowResult: document.querySelector('.open-result-modal-button'),
  btnCloseResult: document.querySelector('.modal-close'),
  resultModal: document.querySelector('.modal'),
  inputWinningNumber: document.querySelectorAll('.winning-number'),
  inputBonusNumber: document.querySelector('.bonus-number'),
  resultCellList: document.querySelectorAll('.result-cnt'),
  resultRate: document.querySelector('.rate-result'),
  resetState: document.querySelector('.reset'),
}

export default selectors
