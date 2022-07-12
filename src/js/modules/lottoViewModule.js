import { LOTTO_PER_PRICE } from '../consts.js';
import { reduceByFunctionCompose } from '../utils.js';

const lottoViewModule = ($moneyInput) => {
  const initializeView = () => {
    $moneyInput.min = LOTTO_PER_PRICE;
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

  const renderAutoBuyResult = ($autoBuyResultUl, boughtResult) => {
    $autoBuyResultUl.innerHTML =
      reduceByFunctionCompose(boughtResult)(getLottoTicketSet);
  };

  const visibleAutoBuySectionView = ($autoBuySection) => {
    $autoBuySection.classList.remove('hidden');
  };

  return {
    initializeView,
    getLottoTicketSet,
    renderTicketNumbers,
    renderAutoBuyResult,
    visibleAutoBuySectionView,
  };
};

export { lottoViewModule };
