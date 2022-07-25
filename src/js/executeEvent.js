import showLottoDetail from './view/showLottoDetail.js';
import checkTheResult from './model/checkTheResult.js';
import hideModal from './view/hideModal.js';
import replay from './view/replay.js';
import purchaseLotto from './model/purchaseLotto.js';

function executeEvent() {
  const purchaseButton = document.querySelector('.btn-purchase');
  const showNumberInput = document.querySelector('.show-number-input');
  const winningNumberForm = document.getElementById('winning-number-form');
  const modalCloseButton = document.querySelector('.modal-close');
  const replayButton = document.querySelector('.btn-replay');

  purchaseButton.addEventListener('click', (e) => {
    e.preventDefault();
    purchaseLotto();
  });

  showNumberInput.addEventListener('click', (e) => {
    const { checked } = e.target;
    showLottoDetail(checked);
  });

  winningNumberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    checkTheResult();
  });

  modalCloseButton.addEventListener('click', () => hideModal());

  replayButton.addEventListener('click', () => {
    hideModal();
    replay();
  });
}

export default executeEvent;