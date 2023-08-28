import {
  ERROR_WRONG_LOTTO_ANSWER_MESSAGE,
  ERROR_WRONG_LOTTO_BONUS_MESSAGE,
} from '../../constants/error.const.js';

const runStatistics = (lotto, lottoStatistics, lottoAnswers, lottoBonus) => {
  const $lottoAnswersForm = document.querySelector('.lotto-answers-form');
  const $lottoAnswersInputs = document.querySelectorAll('.winning-number');
  const $lottoAnswersBonusInput = document.querySelector('.bonus-number');

  const $lottoStatisticsTableRows =
    document.querySelectorAll('.lotto-statistics');
  const $lottoProfitRate = document.querySelector('.lotto-profit-rate');
  const $restartButton = document.querySelector('.restart-button');

  const $modal = document.querySelector('.modal');

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
      tableRow.lastElementChild.innerHTML = `${
        statistics[matchPlaceMap[idx]]
      }개`;
    });

    $lottoProfitRate.innerHTML = `당신의 총 수익률은 ${profitRate}%입니다.`;
  };

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

  $restartButton.addEventListener('click', (event) => {
    window.location.href = '/';
  });
};

export default runStatistics;
