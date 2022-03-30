import { LOTTO_PRICE } from '../constants/lotto.js';

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
    reward: WINNING_REWARD_MONEY_5TH,
    key: WINNING_5TH,
  },
  {
    label: `${WINNING_4TH_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_4TH,
    key: WINNING_4TH,
  },
  {
    label: `${WINNING_3RD_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_3RD,
    key: WINNING_3RD,
  },
  {
    label: `${WINNING_2ND_MATCH_CASE}개 + 보너스볼`,
    reward: WINNING_REWARD_MONEY_2ND,
    key: WINNING_2ND,
  },
  {
    label: `${WINNING_1ST_MATCH_CASE}개`,
    reward: WINNING_REWARD_MONEY_1ST,
    key: WINNING_1ST,
  },
];

const winingLottoHistoryModalView = (function () {
  const $winningResultModal = document.querySelector('.modal');
  const $modalCloseButton = $winningResultModal.querySelector('.modal-close');
  const $restartButton = $winningResultModal.querySelector('.btn.btn-cyan');
  const $winningResultPanel = $winningResultModal.querySelector('tbody');
  const $resultRevenue = $winningResultModal.querySelector(
    '.text-center.font-bold'
  );

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

  function calculateWinningResult({ lottoList, winningNumbers, bonusNumber }) {
    const result = {
      [WINNING_1ST]: 0,
      [WINNING_2ND]: 0,
      [WINNING_3RD]: 0,
      [WINNING_4TH]: 0,
      [WINNING_5TH]: 0,
      [WINNING_FAIL]: 0,
    };
    lottoList.forEach((lotto) => {
      const winningResult = getWinningResultFromLotto({
        lottoNumbers: lotto.split(','),
        winningNumbers,
        bonusNumber,
      });
      result[winningResult] += 1;
    });
    return result;
  }

  function createWinningResultPanel(winningResult) {
    const $panel = document.createDocumentFragment();
    WINNING_RESULT_CASE.forEach((winningCase) => {
      const tr = document.createElement('tr');
      tr.classList.add('text-center');
      tr.innerHTML = `
        <td class="p-3">${winningCase.label}</td>
         <td class="p-3">${new Intl.NumberFormat().format(
           winningCase.reward
         )}</td>
         <td class="p-3">${winningResult[winningCase.key]} 개</td>
    `;
      $panel.appendChild(tr);
    });
    $winningResultPanel.replaceChildren($panel);
  }

  function createCalculateRevenue({ lottoList, winningResult }) {
    const purchasedPrice = lottoList.length * LOTTO_PRICE;
    const revenue = Object.entries(winningResult).reduce(
      (result, [resultCase, value]) => {
        const RESULT_CASE_KEY = Number(resultCase);
        if (RESULT_CASE_KEY === WINNING_FAIL) {
          return result;
        }

        return (
          result +
          value *
            WINNING_RESULT_CASE.find(
              (winningCase) => winningCase.key === RESULT_CASE_KEY
            ).reward
        );
      },
      0
    );
    $resultRevenue.innerHTML = `당신의 총 수익률은 ${
      revenue / purchasedPrice
    }%입니다.`;
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

  function eventBindings(onRestart) {
    $modalCloseButton.addEventListener('click', close);
    $restartButton.addEventListener('click', () => handleRestart(onRestart));
  }

  function handleOpen({ lottoList, winningNumbers, bonusNumber }) {
    open();
    const winningResult = calculateWinningResult({
      lottoList,
      winningNumbers,
      bonusNumber,
    });
    createWinningResultPanel(winningResult);
    createCalculateRevenue({ lottoList, winningResult });
  }

  return {
    open: handleOpen,
    eventBindings,
  };
})();
export default winingLottoHistoryModalView;
