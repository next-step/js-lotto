const selectors = {
  btnBuy: document.getElementById('btn-buy'),
  inputPurchaseAmount: document.getElementById('input-purchase-amount'),
  labelBuyCnt: document.getElementById('label-buy-cnt'),
  listLotto: document.getElementById('list-lotto'),
  lottoImgList: document.getElementsByClassName('lotto-img'),
  toggleLottoNumbers: document.getElementsByClassName('lotto-numbers-toggle-button')[0],
  btnShowResult: document.getElementsByClassName('open-result-modal-button')[0],
  btnCloseResult: document.getElementsByClassName('modal-close')[0],
  resultModal: document.getElementsByClassName('modal')[0],
  inputWinningNumber: document.getElementsByClassName('winning-number'),
  inputBonusNumber: document.getElementsByClassName('bonus-number')[0],
  resultCellList: document.getElementsByClassName('result-cnt'),
  resultRate: document.getElementsByClassName('rate-result')[0],
  resetState: document.getElementsByClassName('reset')[0],
}

export default selectors
