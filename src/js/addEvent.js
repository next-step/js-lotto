import showLottoDetail from './view/showLottoDetail.js';
import checkTheResult from './model/checkTheResult.js';
import hideModal from './view/hideModal.js';
import purchaseLotto from './model/purchaseLotto.js';
import restartGame from './model/restartGame.js';

function addEvent() {
  const purchaseButton = document.querySelector('.btn-purchase');
  const showNumberInput = document.querySelector('.show-number-input');
  const winningNumberForm = document.getElementById('winning-number-form');
  const modalCloseButton = document.querySelector('.modal-close');
  const replayButton = document.querySelector('.btn-replay');

  purchaseButton.addEventListener('click', purchaseLotto);

  showNumberInput.addEventListener('click', showLottoDetail);

  winningNumberForm.addEventListener('submit', checkTheResult);

  modalCloseButton.addEventListener('click', hideModal);

  replayButton.addEventListener('click', restartGame);
}

export default addEvent;