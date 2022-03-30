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

const WINNING_1ST = 1;
const WINNING_2ND = 2;
const WINNING_3RD = 3;
const WINNING_4TH = 4;
const WINNING_5TH = 5;
const WINNING_FAIL = 0;

const WINNING_RESULT_CASE = [
  {
    label: `${WINNING_5TH_MATCH_CASE}개`,
    reward: new Intl.NumberFormat().format(WINNING_REWARD_MONEY_5TH),
  },
  {
    label: `${WINNING_4TH_MATCH_CASE}개`,
    reward: new Intl.NumberFormat().format(WINNING_REWARD_MONEY_4TH),
  },
  {
    label: `${WINNING_3RD_MATCH_CASE}개`,
    reward: new Intl.NumberFormat().format(WINNING_REWARD_MONEY_3RD),
  },
  {
    label: `${WINNING_2ND_MATCH_CASE}개 + 보너스볼`,
    reward: new Intl.NumberFormat().format(WINNING_REWARD_MONEY_2ND),
  },
  {
    label: `${WINNING_1ST_MATCH_CASE}개`,
    reward: new Intl.NumberFormat().format(WINNING_REWARD_MONEY_1ST),
  },
];

const winingLottoHistoryModalView = (function () {
  const $winningResultModal = document.querySelector('.modal');
  const $modalCloseButton = $winningResultModal.querySelector('.modal-close');
  const $restartButton = $winningResultModal.querySelector('.btn.btn-cyan');
  const $winningResultPanel = $winningResultModal.querySelector('tbody');

  function handleOpen({ lottoList, winningNumbers, bonusNumber }) {
    open();
    createWinningResultPanel(
      calculateWinningResult({ lottoList, winningNumbers, bonusNumber })
    );
  }

  function calculateWinningResult({ lottoList, winningNumbers, bonusNumber }) {
    return lottoList.reduce((result, lotto) => {
      const winningResult = getWinningResultFromLotto({
        lottoNumbers: lotto,
        winningNumbers,
        bonusNumber,
      });
      result.set(winningResult, result.get(winningResult) + 1);
      return result;
    }, new Map());
  }

  function createWinningResultPanel(winningResult) {
    const $panel = document.createElement('tbody');
    $panel.innerHTML = WINNING_RESULT_CASE.map(
      (winningCase) => `
       <tr class="text-center">
         <td class="p-3">${winningCase.label}</td>
         <td class="p-3">${winningCase.reward}</td>
         <td class="p-3"></td>
       </tr>
    `
    ).join('');
    $winningResultPanel.replaceWith($panel);
  }

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

  function getWinningResultFromLotto({
    lottoNumbers,
    winningNumbers,
    bonusNumber,
  }) {
    if (
      getWinningDigit(lottoNumbers, winningNumbers) === WINNING_1ST_MATCH_CASE
    ) {
      return WINNING_1ST;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumbers) ===
        WINNING_2ND_MATCH_CASE &&
      lottoNumbers.some((number) => number === bonusNumber)
    ) {
      return WINNING_2ND;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumbers) === WINNING_3RD_MATCH_CASE
    ) {
      return WINNING_3RD;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumbers) === WINNING_4TH_MATCH_CASE
    ) {
      return WINNING_4TH;
    }

    if (
      getWinningDigit(lottoNumbers, winningNumbers) === WINNING_5TH_MATCH_CASE
    ) {
      return WINNING_5TH;
    }

    return WINNING_FAIL;
  }

  function eventBindings(onRestart) {
    $modalCloseButton.addEventListener('click', close);
    $restartButton.addEventListener('click', () => handleRestart(onRestart));
  }

  return {
    open: handleOpen,
    eventBindings,
  };
})();
export default winingLottoHistoryModalView;
