import lottoVendingView from './lottoVendingView.js';

const winingLottoHistoryModalView = (function () {
  const $winningResultModal = document.querySelector('.modal');
  const $modalCloseButton = $winningResultModal.querySelector('.modal-close');
  const $restartButton = $winningResultModal.querySelector('.btn.btn-cyan');

  function open() {
    $winningResultModal.classList.add('open');
  }

  function close() {
    $winningResultModal.classList.remove('open');
  }

  function handleRestart() {
    close();
    lottoVendingView.initial();
  }

  function eventBindings() {
    $modalCloseButton.addEventListener('click', close);
    $restartButton.addEventListener('click', handleRestart);
  }

  eventBindings();

  return {
    open,
  };
})();
export default winingLottoHistoryModalView;
