import {
  ERROR_WRONG_LOTTO_ANSWER_MESSAGE,
  ERROR_WRONG_LOTTO_BONUS_MESSAGE,
  ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE,
} from './constants/error.const.js';
import { Lotto, LottoStatistics } from './lotto/index.js';

const $purchaseAmountForm = document.querySelector('.purchase-amount-form');
const $purchaseAmountInput = document.querySelector('.purchase-amount__input');

const $purchaseLottosSection = document.querySelector(
  '.purchase-lottos-section'
);
const $purchaseLottosLabel = document.querySelector('.purchase-lottos__label');
const $purchaseLottosTicket = document.querySelector(
  '.purchase-lottos__ticket'
);
const $purchaseLottosSwitch = document.querySelector(
  '.lotto-numbers-toggle-button'
);

const $lottoAnswersForm = document.querySelector('.lotto-answers-form');
const $lottoAnswersInputs = document.querySelectorAll('.winning-number');
const $lottoAnswersBonusInput = document.querySelector('.bonus-number');

const $modal = document.querySelector('.modal');
const $lottoStatisticsTableRows =
  document.querySelectorAll('.lotto-statistics');
const $lottoProfitRate = document.querySelector('.lotto-profit-rate');
const $restartButton = document.querySelector('.restart-button');

const lotto = new Lotto();
const lottoStatistics = new LottoStatistics();

const lottoAnswers = [];
let lottoBonus = '';

const showBelowElements = (isShow) => {
  const visibilityStyle = isShow ? 'visible' : 'hidden';

  $purchaseLottosSection.style.visibility = visibilityStyle;
  $lottoAnswersForm.style.visibility = visibilityStyle;
};

const createPurchaseLottosElements = (purchasedLottoCounts) => {
  $purchaseLottosLabel.innerHTML = `
  총 ${purchasedLottoCounts}개를 구매하였습니다.
`;

  if (purchasedLottoCounts === 0) {
    $purchaseLottosTicket.parentElement.style.visibility = 'hidden';
    return;
  }

  if (purchasedLottoCounts > 1) {
    $purchaseLottosTicket.parentElement.style.visibility = 'visible';
    Array(purchasedLottoCounts - 1)
      .fill($purchaseLottosTicket)
      .forEach((element) => {
        $purchaseLottosTicket.parentElement.appendChild(
          element.cloneNode(true)
        );
      });
  }
};

const createStatisticsModalElements = () => {
  const lottoCandidates = lotto.getLottoCandidates();
  const lottoAnswer = lotto.getLottoAnswer();
  const currentLottoBonus = lotto.getLottoBonus();

  lottoStatistics.setStatistics(
    lottoCandidates,
    lottoAnswer,
    currentLottoBonus
  );

  const statistics = lottoStatistics.getStatistics();
  const purchaseLottoCounts = lotto.getPurchasedLottoCounts();
  const profitRate = lottoStatistics.calculateProfitRate(purchaseLottoCounts);

  const matchPlaceMap = {
    0: 'fifth place',
    1: 'fourth place',
    2: 'third place',
    3: 'second place',
    4: 'first place',
  };

  $lottoStatisticsTableRows.forEach((tableRow, idx) => {
    tableRow.lastElementChild.innerHTML = `${statistics[matchPlaceMap[idx]]}개`;
  });

  $lottoProfitRate.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
};

$purchaseAmountForm.addEventListener('change', (event) => {
  const { value: purchaseAmount } = event.target;

  if (!lotto.validatePurchaseAmount(purchaseAmount)) {
    alert(ERROR_WRONG_PURCHASE_AMOUNT_MESSAGE);
    $purchaseAmountInput.value = '';
    return;
  }

  lotto.setPurchasedLottoCounts(purchaseAmount);

  const purchasedLottoCounts = lotto.getPurchasedLottoCounts();
  lotto.setLottoCandidates(purchasedLottoCounts);

  showBelowElements(true);

  createPurchaseLottosElements(purchasedLottoCounts);
});

$purchaseAmountForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

$purchaseLottosSwitch.addEventListener('change', (event) => {
  const { checked } = event.target;

  const tickets = document.querySelectorAll('.purchase-lottos__ticket');
  const lottoCandidates = document.querySelectorAll('.lotto-candidate');

  if (checked) {
    if (lottoCandidates.length < 1) {
      tickets.forEach((ticket, idx) => {
        const lottoCandidate = document.createElement('span');
        lottoCandidate.className = 'lotto-candidate';
        lottoCandidate.innerHTML = lotto.getLottoCandidates()[idx];

        ticket.appendChild(lottoCandidate);
      });
    } else {
      lottoCandidates.forEach((lottoCandidate) => {
        lottoCandidate.style.display = 'inline-block';
      });
    }
  } else {
    lottoCandidates.forEach((lottoCandidate) => {
      lottoCandidate.style.display = 'none';
    });
  }
});

$lottoAnswersInputs.forEach((lottoAnswersInput, idx) => {
  lottoAnswersInput.addEventListener('change', (event) => {
    const { value: lottoAnswer } = event.target;

    lottoAnswers[idx] = lottoAnswer;
  });
});

$lottoAnswersBonusInput.addEventListener('change', (event) => {
  const { value: bonusNumber } = event.target;

  lottoBonus = bonusNumber;
});

$lottoAnswersForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const lottoAnswerString = lottoAnswers.join(',');

  if (!lotto.validateLottoAnswer(lottoAnswerString)) {
    alert(ERROR_WRONG_LOTTO_ANSWER_MESSAGE);
    $modal.classList.remove('open');
    return;
  }

  lotto.setLottoAnswer(lottoAnswerString);

  if (!lotto.validateLottoBonus(lottoBonus)) {
    alert(ERROR_WRONG_LOTTO_BONUS_MESSAGE);
    $modal.classList.remove('open');
    return;
  }

  lotto.setLottoBonus(lottoBonus);

  createStatisticsModalElements();
});

$restartButton.addEventListener('click', (event) => {
  window.location.href = '/';
});
