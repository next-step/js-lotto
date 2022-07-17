import {
  LOTTO_MAX_NUMBER,
  LOTTO_MIN_NUMBER,
  LOTTO_PER_PRICE,
  LOTTO_TRY_COUNT,
  MATCHED_NUMBERS_ADDED_STR,
  PRIZE_MONEY,
} from '../consts.js';
import {
  compareNumbers,
  reduceByFunctionCompose,
  filterByNumber,
} from '../utils.js';

const lottoViewModule = (
  $moneyInput,
  $autoBuySection,
  $autoBuyResultUl,
  $winningNumberInputWrapper,
  $bonusNumberInput,
  $winningNumbersForm,
  $modal
) => {
  const getWinningNumbersSet = () =>
    `<input type="number" class="winning-number mx-1 text-center" min="${LOTTO_MIN_NUMBER}" max="${LOTTO_MAX_NUMBER}" required />`;

  const initializeView = () => {
    $moneyInput.min = LOTTO_PER_PRICE;
    $moneyInput.value = '';
    $winningNumberInputWrapper.innerHTML = Array.from({
      length: LOTTO_TRY_COUNT,
    })
      .map(getWinningNumbersSet)
      .join('');
    $bonusNumberInput.value = '';
    $modal.classList.remove('open');
    $autoBuySection.classList.add('hidden');
    $winningNumbersForm.classList.add('hidden');
  };

  const renderTicketNumbers = ($buyTicketsCountLabel, ticketNumbers) => {
    $buyTicketsCountLabel.innerHTML = `총 ${ticketNumbers}개를 구매하였습니다.`;
  };
  const getLottoTicketSet = (
    lottoTry
  ) => `<li class="mx-1 text-4xl lotto-ticket-set">
        <span>🎟️ </span>
        <span class="lotto-result">${lottoTry.flat()}</span>
      </li>`;

  const renderAutoBuyResult = (boughtResult) => {
    $autoBuyResultUl.innerHTML =
      reduceByFunctionCompose(boughtResult)(getLottoTicketSet);
  };

  const visibleAutoBuySectionView = () => {
    $autoBuySection.classList.remove('hidden');
  };

  const getWinningValuesInInput = ($winningNumberInputWrapper) => {
    const inputs =
      $winningNumberInputWrapper.querySelectorAll('.winning-number');
    return Array.from(inputs).map((input) => +input.value);
  };

  const getWinningResultViewModel = (winningResult) => {
    return Object.keys(PRIZE_MONEY)
      .map((matchedNumber) => ({
        match: matchedNumber,
        prizeMoney: PRIZE_MONEY[matchedNumber],
        matchStr: `${Math.floor(+matchedNumber)}개${
          MATCHED_NUMBERS_ADDED_STR[matchedNumber] || ''
        }`,
        winningCount: filterByNumber(winningResult, matchedNumber).length,
      }))
      .sort((prev, next) => compareNumbers(prev.match, next.match));
  };

  const getWinningResultSet = ({ matchStr, prizeMoney, winningCount }) =>
    `<tr class="text-center">
        <td class="p-3">${matchStr}</td>
        <td class="p-3">${prizeMoney.toLocaleString()}</td>
        <td class="p-3">${winningCount}개</td>
     </tr>`;

  const renderWinningResult = ($winningResultBody, winningViewModels) => {
    $winningResultBody.innerHTML =
      reduceByFunctionCompose(winningViewModels)(getWinningResultSet);
  };

  const getRateOfProfit = (inputMoney, viewModel) => {
    return (
      viewModel.reduce(
        (result, { prizeMoney, winningCount }) =>
          result + prizeMoney * winningCount,
        0
      ) / inputMoney
    );
  };

  const renderProfit = ($rateOfProfit, inputMoney, viewModel) => {
    $rateOfProfit.innerHTML = `당신의 총 수익률은 ${getRateOfProfit(
      inputMoney,
      viewModel
    ).toLocaleString()}%입니다.`;
  };
  const visibleWinningFormView = () => {
    $winningNumbersForm.classList.remove('hidden');
  };

  return {
    initializeView,
    getLottoTicketSet,
    renderTicketNumbers,
    renderAutoBuyResult,
    visibleAutoBuySectionView,
    getWinningValuesInInput,
    getWinningResultViewModel,
    renderWinningResult,
    visibleWinningFormView,
    getRateOfProfit,
    renderProfit,
  };
};

export { lottoViewModule };
