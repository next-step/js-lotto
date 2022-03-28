const WINNING_REWARD_MONEY_1ST = 2000000000;
const WINNING_REWARD_MONEY_2ND = 30000000;
const WINNING_REWARD_MONEY_3RD = 1500000;
const WINNING_REWARD_MONEY_4TH = 50000;
const WINNING_REWARD_MONEY_5TH = 5000;

const WINNING_1ST_MATCH_CASE = 6;
const WINNING_2ND_MATCH_CASE = 5;
const WINNING_3RD_MATCH_CASE = 5;
const WINNING_4TH_MATCH_CASE = 4;
const WINNING_5TH_MATCH_CASE = 3;

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

  function handleRestart(onRestart) {
    // eslint-disable-next-line no-debugger
    close();
    onRestart();
  }

  function getWinningDigit(lottoNumbers, winningNumbers) {
    return lottoNumbers.filter((number) =>
      winningNumbers.some((winningNumber) => winningNumber === number)
    ).length;
  }

  function getWinningRewardFromLotto({
    lottoNumbers,
    winningNumber,
    bonusNumber,
  }) {
    if (
      getWinningDigit(lottoNumbers, winningNumber) === WINNING_1ST_MATCH_CASE
    ) {
      return WINNING_REWARD_MONEY_1ST;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumber) === WINNING_2ND_MATCH_CASE &&
      lottoNumbers.some((number) => number === bonusNumber)
    ) {
      return WINNING_REWARD_MONEY_2ND;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumber) === WINNING_3RD_MATCH_CASE
    ) {
      return WINNING_REWARD_MONEY_3RD;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumber) === WINNING_4TH_MATCH_CASE
    ) {
      return WINNING_REWARD_MONEY_4TH;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumber) === WINNING_5TH_MATCH_CASE
    ) {
      return WINNING_REWARD_MONEY_5TH;
    }
  }

  function eventBindings(onRestart) {
    $modalCloseButton.addEventListener('click', close);
    $restartButton.addEventListener('click', () => handleRestart(onRestart));
  }

  return {
    open,
    eventBindings,
  };
})();
export default winingLottoHistoryModalView;
